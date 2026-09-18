/**
 * AMZ Leads Radar - Reddit Data Ingestion & Gemini AI Analysis Pipeline
 * 
 * This service monitors targeted subreddits and search queries via Reddit RSS feeds,
 * uses Google Gemini 2.5 Flash to extract buyer pain points & generate stealth replies,
 * and upserts validated leads into Supabase.
 */

import { GoogleGenAI, Type, Schema } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import Parser from "rss-parser";

// 1. Environment Configurations
const SUPABASE_URL = process.env.SUPABASE_URL || "https://your-project.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-role-key";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "your-gemini-api-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const rssParser = new Parser();

// Targeted Subreddits & Keywords
const TARGET_FEEDS = [
  {
    category: "General Consumer",
    url: "https://www.reddit.com/r/BuyItForLife/new/.rss?sort=new"
  },
  {
    category: "Amazon & Shopping",
    url: "https://www.reddit.com/r/amazon/new/.rss?sort=new"
  },
  {
    category: "Electronics",
    url: "https://www.reddit.com/r/gadgets/new/.rss?sort=new"
  },
  {
    category: "Specific Pain Points",
    url: "https://www.reddit.com/search.rss?q=alternative+to+amazon+OR+%22broke+after%22+OR+%22terrible+quality%22&sort=new"
  }
];

// JSON Schema for Gemini Structured Output
const LeadAnalysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    is_lead: {
      type: Type.BOOLEAN,
      description: "True if post is complaining about products, seeking recommendations, or looking for alternatives."
    },
    match_score: {
      type: Type.INTEGER,
      description: "Relevance score from 0 to 100 on how valuable this lead is for Amazon sellers."
    },
    category: {
      type: Type.STRING,
      description: "Product category (Electronics, Home & Kitchen, Outdoor, Office, Beauty, etc.)"
    },
    painpoint_summary: {
      type: Type.STRING,
      description: "Concise summary in Traditional Chinese explaining the core user complaint or need."
    },
    keyword_matches: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Key product features or complaint terms mentioned."
    },
    replies: {
      type: Type.OBJECT,
      properties: {
        helpful_enthusiast: {
          type: Type.STRING,
          description: "Friendly expert tone in native American English, offering objective tips and naturally mentioning [Your Brand / Link]."
        },
        fellow_sufferer: {
          type: Type.STRING,
          description: "Empathetic buyer tone sharing personal experience with the same issue and how [Your Brand / Link] solved it."
        },
        tech_pro_solution: {
          type: Type.STRING,
          description: "Technical professional breakdown explaining why the problem happened and what specs to look for in [Your Brand / Link]."
        }
      },
      required: ["helpful_enthusiast", "fellow_sufferer", "tech_pro_solution"]
    }
  },
  required: ["is_lead", "match_score", "category", "painpoint_summary", "keyword_matches", "replies"]
};

/**
 * Ingest and process posts from RSS
 */
export async function runIngestionPipeline() {
  console.log("🚀 Starting AMZ Leads Radar ingestion pipeline...");

  for (const feed of TARGET_FEEDS) {
    try {
      console.log(`📡 Fetching feed: ${feed.url}`);
      const feedData = await rssParser.parseURL(feed.url);

      for (const item of feedData.items.slice(0, 10)) {
        if (!item.link || !item.title) continue;

        // Check if lead already processed
        const { data: existing } = await supabase
          .from("leads")
          .select("id")
          .eq("reddit_url", item.link)
          .maybeSingle();

        if (existing) {
          console.log(`⏩ Lead already exists: ${item.title.slice(0, 40)}...`);
          continue;
        }

        console.log(`🔍 Analyzing lead with Gemini 2.5 Flash: ${item.title}`);

        const prompt = `
You are an expert social media off-Amazon traffic specialist.
Analyze this Reddit post to determine if it represents an opportunity for an Amazon seller/brand to provide a helpful recommendation or solution:

Post Title: ${item.title}
Post Content / Snippet: ${item.contentSnippet || item.content || "N/A"}
Source Link: ${item.link}

Evaluate whether this is a genuine product complaint, pain point, or recommendation request.
Generate the response strictly according to the provided schema.
`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: LeadAnalysisSchema,
            temperature: 0.2
          }
        });

        const analysis = JSON.parse(response.text || "{}");

        if (analysis.is_lead && analysis.match_score >= 70) {
          console.log(`✅ Qualified Lead found (${analysis.match_score}%): ${item.title}`);

          const { error: insertError } = await supabase.from("leads").insert({
            reddit_url: item.link,
            reddit_id: item.guid || item.id || `reddit_${Date.now()}`,
            subreddit: item.link.match(/reddit\.com\/r\/([^/]+)/)?.[1] ? `r/${item.link.match(/reddit\.com\/r\/([^/]+)/)?.[1]}` : "r/all",
            title: item.title,
            author: item.creator || item.author || "Redditor",
            content_raw: item.contentSnippet || item.content || "",
            painpoint_summary: analysis.painpoint_summary,
            keyword_matches: analysis.keyword_matches,
            match_score: analysis.match_score,
            upvotes: Math.floor(Math.random() * 150) + 20, // Sample engagement
            comments_count: Math.floor(Math.random() * 50) + 5,
            suggested_reply: analysis.replies.helpful_enthusiast,
            replies: analysis.replies,
            category: analysis.category || feed.category,
            status: "new"
          });

          if (insertError) {
            console.error("❌ Failed to save lead:", insertError.message);
          } else {
            console.log("💾 Successfully saved lead to Supabase.");
          }
        } else {
          console.log(`⏭️ Skipped non-lead or low score (${analysis.match_score}%): ${item.title.slice(0, 40)}`);
        }
      }
    } catch (err: any) {
      console.error(`⚠️ Error processing feed ${feed.url}:`, err.message);
    }
  }

  console.log("🎉 Ingestion cycle finished.");
}

// If executed directly
if (require.main === module) {
  runIngestionPipeline().catch(console.error);
}
