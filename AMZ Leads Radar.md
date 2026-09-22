# AMZ Leads Radar: 跨境電商微型 SaaS 雙軌制拓客系統開發與營運白皮書

本文件為獨立創業者（Solopreneur / One Person Company, OPC）量身打造，旨在運用最低成本的「輕資產架構」，快速構建一款能精準攔截流量、並在美國 Amazon 賣家生態圈實現商業變現的微型 AI 工作流 SaaS 系統。

---

## 📌 執行摘要與核心產品定位

在 AI 創業生態中，90% 獲利的微型 SaaS 皆屬於 **AI Wrapper**（大模型垂直工作流封裝型產品）。這類產品的核心商業價值並非源自底層模型的研發，而是透過**深度的垂直工作流整合（Workflow Integration）**與極致的 UI/UX，切入大廠（如 Google、OpenAI）通用介面無法觸及的特定行業剛需痛點。

### 🌟 核心轉型：從「純外掛」升級為「集中式 Web 線索看板 + 瀏覽器輔助回覆工具」雙軌制

1. **集中式 Web 看板（Centralized Web Dashboard）**：
   - 全天候自動監控海外公開社群（以 Reddit 為主，包含 `r/amazon`, `r/BuyItForLife`, `r/gadgets` 等熱門品類討論區）。
   - 利用 **Google Gemini 2.5 Flash** 進行自然語言深度解析，提煉出**潛在買家痛點摘要、關鍵字匹配度（Match Score）、原帖熱度評分（Upvotes/Comments）**。
   - 賣家登入 Web 後台，一眼即可綜覽今日最新高價值潛在商機（Leads），並可透過篩選器一鍵跳轉至目標貼文。
2. **Chrome 瀏覽器輔助工具（Chrome Web Store Extension）**：
   - 賣家由 Web 看板點擊進入 Reddit 貼文後，擴充套件於側邊自動喚出 Copilot 面板。
   - 具備**「語氣微調切換（客觀科普 / 買家同理 / 專業解答）」**與**「一鍵填入輸入框（Autofill）」**功能，配合人工審核發布（Human-in-the-loop），徹底解決自動化發文容易被社群封鎖的風險。
3. **商業模式（Freemium）**：
   - 免費版提供每日 5 條最新線索與 3 次回覆填入體驗。
   - Pro 訂閱版（$29~$49/月）解鎖無限線索監控、自訂關鍵字品類、多種專業話術風格與即時通報，為跨境賣家帶來低成本且穩定的站外引流（Off-Amazon Traffic）。

---

## 💡 關鍵決策與技術架構

### 1. 客群剛需：為什麼選擇「美國 Amazon 賣家」站外引流？
* **痛點緊急剛需**：站內廣告（PPC）競價水漲船高，賣家極度渴望具備高權重的外部流量（External Traffic / Off-Amazon Traffic）來推動 Amazon A9/COSMO 演算法的自然排名。
* **高付費意願**：該客群普遍習慣每月為 Helium 10, Jungle Scout 支付 $50~$150 美元工具費，對能帶來直接訂單與流量的工具付費門檻極低。
* **防封鎖護城河**：純機器人發文容易被 Reddit Anti-Spam 演算法秒封。本系統採用「AI 提煉 + 輔助填入 + 真人點擊」的人機協同（Human-in-the-loop）模式，兼具效率與 100% 帳號安全性。

### 2. 雙軌架構與技術堆疊

| 模組 | 建議選型 | 核心價值 |
| :--- | :--- | :--- |
| **Web 看板** | React + Tailwind CSS / Next.js | 輕量、反應迅速、極致流暢的商機篩選與管理體驗 |
| **Chrome 外掛** | Manifest V3 + Content Script | 深度整合 Reddit DOM，精準注入輸入框，相容最新版 Shreddit |
| **核心 AI 引擎** | Google Gemini 2.5 Flash | 語義提取精準、成本極低（百萬 Token 免費配額）、速度快 |
| **資料庫與認證** | Supabase (PostgreSQL + RLS + Auth) | 免自建後端伺服器，支援即時數據同步與資料安全隔離 |
| **數據收集管道** | Reddit 公開 RSS / 輕量 Ingest Worker | 避開 Reddit 昂貴的 API 收費，以合規公開方式抓取數據 |
| **金流支付** | Lemon Squeezy (Merchant of Record) hosted checkout | 由 Lemon Squeezy 處理付款、稅務與訂閱管理；後端以 Webhook 同步權限 |

---

## 🛠 具體資料庫結構與核心工作流

### 1. Supabase 資料庫規格 (`supabase/schema.sql`)

```sql
-- 1. 商機資料表
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  reddit_url text unique not null,
  reddit_id text,
  subreddit text not null,
  title text not null,
  content_raw text,
  painpoint_summary text not null,
  keyword_matches text[] default '{}',
  match_score integer default 80,
  upvotes integer default 0,
  comments_count integer default 0,
  suggested_reply text,
  alternative_replies jsonb default '{}',
  status text default 'new', -- new, in_progress, replied, ignored
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. 用戶檔案與方案額度表
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  plan text default 'free', -- free, pro, agency
  daily_usage_left integer default 3,
  max_daily_usage integer default 3,
  last_usage_reset date default current_date,
  lemon_squeezy_customer_id text,
  lemon_squeezy_subscription_id text,
  lemon_squeezy_variant_id text,
  subscription_status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. 用戶操作軌跡表 (用於數據分析與轉換追蹤)
create table public.lead_activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lead_id uuid references public.leads(id) on delete cascade not null,
  action_type text not null, -- 'jump_to_reddit', 'autofill', 'copied', 'status_change'
  tone_used text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 2. AI 智能提煉模組 (Gemini 2.5 Flash Prompt 設計)

```text
System:
你是一位精通美式社群文化的資深跨境電商營運專家與社群行銷顧問。
請分析傳入的 Reddit 貼文（標題與內文），識別該貼文是否屬於 Amazon/消費品相關的潛在買家線索（如：尋求產品推薦、抱怨現有大牌差評、尋找平替、詢問如何解決特定產品問題）。

輸出格式請嚴格遵守 JSON：
{
  "is_lead": true,
  "match_score": 92,
  "painpoint_summary": "買家抱怨某熱門行動電源使用 3 個月後電池膨脹且客服不理，正急尋具備安全認證且支援 65W PD 快充的耐用平替。",
  "keyword_matches": ["battery swelling", "power bank", "replacement", "65W PD"],
  "replies": {
    "helpful_enthusiast": "用熱心客觀的第三方消費者視角科普規格，自然帶入產品優點",
    "fellow_sufferer": "共鳴同理差評痛點，隨後分享自己換成 [Your Brand] 的實際滿意體驗",
    "tech_pro_solution": "從電芯與過熱保護技術切入，專業客觀分析該如何挑選合格產品"
  }
}
```

---

## 🎨 前端應用層設計

### 1. Web 線索看板 (Web Dashboard)
- **實時雷達流**：展示今日抓取之 Leads，具備直覺的卡片與表格雙視角。
- **指標視覺化**：
  - 🔥 **熱度指標**：Upvotes / Comments 評估貼文曝光潛力。
  - 🎯 **關鍵字匹配度**：80%~99% 綠色高光提示。
  - 🚨 **痛點標籤**：讓賣家 3 秒內決定是否跟進。
- **快捷聯動**：點擊「開啟 Reddit 並喚醒 Copilot」，自動攜帶 Lead ID 跳轉至貼文頁。

### 2. Chrome 外掛輔助 (Reddit Copilot Extension)
- **智慧偵測**：當用戶位於 `reddit.com/r/...` 貼文頁時，Copilot 自動讀取貼文上下文。
- **語氣切換器**：一鍵在三種回覆風格間無縫切換。
- **變數置換**：提供 `[品牌名稱]` 與 `[購買連結/店鋪搜尋引導]` 快捷插入。
- **一鍵填入（Autofill Engine）**：
  - 透過 Content Script 自動搜尋 Reddit 輸入框（相容新版 Shreddit 的 `contenteditable="true"` 與舊版 Markdown `<textarea>`）。
  - 自動注入文字並派遣 `InputEvent`、`change` 事件激活 Reddit 發布按鈕。
- **進度回寫**：填入後自動呼叫 API 將 Web 看板狀態更新為 `Replied`。

---

## 💰 Freemium 商業模式與定價矩陣

| 方案維度 | Free 體驗版 | Pro 專業版 ($29/月) | Growth 旗艦版 ($69/月) |
| :--- | :--- | :--- | :--- |
| **目標受眾** | 探索期創業者、小賣家 | 全職 Amazon 賣家、獨立品牌主 | 跨境電商代營運團隊、MCN 機構 |
| **每日線索獲取** | 每日最新 5 條優質商機 | 無上限（全天候即時更新） | 無上限 + 歷史商機深度搜尋 |
| **外掛輔助填入** | 每日 3 次 | 無上限 | 無上限 + 支援多人席位 |
| **AI 語氣微調** | 僅限預設語氣 | 3 種專業話術風格 + 自訂提示詞 | 5 種風格 + 團隊專屬自訂話術庫 |
| **監控關鍵字與類別** | 官方預設熱門類別 | 可自訂 15 組品類/競品關鍵字 | 可自訂 50 組 + 競品差評即時警報 |
| **即時通報** | 僅 Web 看板 | Web + Telegram / Discord 即時推播 | Web + Webhook + 專屬客服顧問 |

---

## 🚀 Chrome Web Store 上架與合規指南

1. **Manifest V3 規範合規**：
   - 僅宣告必要的 `storage`, `activeTab` 權限。
   - `host_permissions` 僅申請 `https://*.reddit.com/*` 與專案 API 網域，避免 `*://*/*` 廣泛權限，大幅降低審查被拒率。
2. **隱私權政策（Privacy Policy）**：
   - 明確聲明外掛僅在用戶授權下輔助草擬回覆，不收集用戶個人私密密碼或 Reddit 帳號憑證。
3. **推廣與獲客管道**：
   - Product Hunt 發表。
   - 美國 Amazon 賣家 Facebook 社團 / SellerCentral 論壇 / Twitter (X) BuildInPublic 分享。
   - 提供 7 天 Pro 版免費試用，快速積累第一批付費用戶。
