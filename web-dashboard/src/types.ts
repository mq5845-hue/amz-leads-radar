export type LeadStatus = 'new' | 'in_progress' | 'replied' | 'ignored';

export interface ReplyVariations {
  helpful_enthusiast: string;
  fellow_sufferer: string;
  tech_pro_solution: string;
}

export interface Lead {
  id: string;
  reddit_url: string;
  reddit_id: string;
  subreddit: string;
  title: string;
  author: string;
  content_raw: string;
  painpoint_summary: string;
  keyword_matches: string[];
  match_score: number;
  upvotes: number;
  comments_count: number;
  sentiment: 'negative' | 'inquiry';
  suggested_reply: string;
  replies: ReplyVariations;
  status: LeadStatus;
  category: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  plan: 'free' | 'pro' | 'agency';
  daily_usage_left: number;
  max_daily_usage: number;
  brand_name: string;
  store_url: string;
}

export type ToneKey = 'helpful_enthusiast' | 'fellow_sufferer' | 'tech_pro_solution';
