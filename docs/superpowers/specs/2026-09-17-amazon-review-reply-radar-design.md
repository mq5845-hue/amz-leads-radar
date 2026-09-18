# AMZ Leads Radar 設計規格

## 產品目標

服務 Amazon.com 賣家，在 Seller Central 處理 1–3 星評論：讀取評論、分析痛點、依品牌語氣生成英文回覆，並將草稿填入 Amazon 回覆欄位，由賣家最後確認送出。公開 Amazon 商品頁與 Reddit 是輔助情報入口；Reddit 第一階段支援貼文頁偵測與摘要，第二階段加入關鍵字／品牌／ASIN 主動搜尋。

## MVP 流程

1. Extension 偵測 Seller Central 評論卡片並標記 1–3 星評論。
2. 使用者點選 Generate reply；後端檢查方案與用量後生成結構化英文草稿。
3. Copilot 面板顯示品牌語氣、痛點分析、風險提示與額外指示輸入。
4. 使用者按 Fill reply，Extension 填入 Amazon 回覆欄位，但不自動按送出。
5. DOM 不相容時提供 Copy Draft 降級流程；只有成功填入才記錄成功活動。

## Extension 邊界

- Manifest V3、Service Worker、Content Script、Popup／Side Panel。
- 僅在 `sellercentral.amazon.com`、`amazon.com` 與 `reddit.com` 執行。
- 不讀取或保存密碼、Cookie、session token。
- Content Script 使用可替換 DOM adapter，支援 selector 改版與手動複製降級。

## Backend 與 AI

- Supabase Auth、Postgres、RLS；AI 金鑰只存在伺服器端。
- API 負責生成、原子扣除用量、方案權限、品牌設定與活動紀錄。
- AI 輸出經 schema 驗證；格式錯誤或 timeout 不扣成功額度。
- 禁止虛構退款、保固、認證、醫療／安全保證或未提供的產品功能。
- MVP 採品牌語氣模板＋差評分析＋英文回覆，並允許每次輸入額外指示。
- Pro／P1 加入從品牌網站、商品描述與核准回覆建立品牌語氣摘要，且可編輯／刪除。

## Reddit 輔助

- P1：在 Reddit 貼文頁讀取可見標題與內文，顯示痛點摘要與關鍵字。
- P2／Pro：支援品牌、ASIN、關鍵字主動搜尋；以合規公開來源和可停用 connector 為邊界。
- 不自動發布 Reddit 回覆，不繞過登入、驗證碼或平台限制。

## 方案與用量

| 功能 | Free | Pro | Growth（後續） |
|---|---:|---:|---:|
| 差評生成／Fill reply | 每日 3 次 | 每月 300 次 | 每月 1,000 次 |
| Reddit 貼文摘要 | 每日 5 次 | 每日 50 次 | 每日 200 次 |
| 主動 Reddit 搜尋 | 不提供 | 每月 100 次 | 每月 500 次 |
| 品牌語氣自動建立 | 不提供 | 1 個品牌 | 多品牌（後續） |

額度由 server-side usage ledger 決定，request ID unique 防止重扣；價格先保留為驗證變數。

## 資料模型方向

保留既有 `leads`、`profiles`、`lead_activities`，以 additive migration 擴充：

- `subscriptions`：provider IDs、plan、status、period end、同步時間。
- `usage_events`：user、feature、request ID、units、period key、結果與時間。
- `brand_profiles`：品牌、客服政策、語氣、禁止承諾、來源與版本。
- `review_drafts`：user、ASIN、review fingerprint、星級、原文摘要、草稿、模型版本、狀態、填入時間。
- `reddit_observations`：URL／post ID、摘要、關鍵字、來源時間與使用者關聯。
- 使用者資料表啟用 RLS；公開來源資料與私人賣家資料分離。

## 驗收條件

- Seller Central 可辨識 1–3 星評論並開啟 Copilot。
- 生成英文草稿、通過禁止承諾檢查，且用量只成功扣一次。
- Fill reply 可填入測試欄位；Extension 永不自動觸發送出。
- selector 不匹配時 Copy Draft 可用且不顯示成功填入。
- Free／Pro、RLS、重複 request ID、subscription webhook 均有自動化測試。
- 既有 Reddit Copilot 與 Dashboard 不移除，改動採 additive。

## 開發順序

1. Seller Central DOM adapter 與本地 fixture。
2. Review draft API、usage ledger、品牌設定。
3. Auth、subscription 權限與 Dashboard。
4. Reddit 貼文摘要，再做主動搜尋。
