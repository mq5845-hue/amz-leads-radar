# Amazon Review Reply MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Amazon Seller Central 將 1–3 星評論轉成可審核的英文回覆草稿，並安全填入回覆欄位。

**Architecture:** 保留現有 Manifest V3 Reddit Copilot 與 Dashboard，新增 Amazon DOM adapter、review draft API、server-side usage ledger 與品牌設定。Content Script 只負責頁面資料與填入；AI 金鑰、權限與用量全部由後端控制。

**Tech Stack:** Chrome Manifest V3、原生 JavaScript、Supabase Postgres/RLS、TypeScript API、既有 Vite Dashboard。

**Spec:** `docs/superpowers/specs/2026-09-17-amazon-review-reply-radar-design.md`

## Global Constraints

- 僅支援 `sellercentral.amazon.com`、`amazon.com` 與 `reddit.com`。
- Extension 永不自動觸發 Amazon 送出按鈕。
- 不讀取或保存密碼、Cookie、session token。
- 既有 Reddit Copilot、Dashboard 與資料表不得移除。
- AI 格式錯誤或 timeout 不扣成功額度。
- 所有使用者資料表啟用 RLS；request ID 必須防止重複扣額度。

---

### Task 1: 建立 Seller Central DOM adapter

**Files:**
- Create: `extension/content/amazon-review-adapter.js`
- Create: `extension/content/amazon-review-adapter.test.js`
- Modify: `extension/manifest.json`

**Interfaces:**
- Produces `scanReviews(document): Array<{reviewId:string, asin:string|null, stars:number, text:string, replyInput:HTMLElement|null}>`。
- Produces `fillReply(input:HTMLElement, draft:string): {ok:boolean, reason:string}`。

- [ ] 寫 fixture 測試：辨識 1–3 星、忽略 4–5 星、找不到欄位時回傳 null。
- [ ] 執行測試確認先失敗。
- [ ] 實作可替換 selector 清單與 `InputEvent` 注入。
- [ ] 測試成功填入與 selector 不匹配的 Copy Draft 降級狀態。
- [ ] 將 adapter 只掛載到 Seller Central review URL，確認既有 Reddit content script 不變。

### Task 2: 新增 review drafts 與 usage ledger migration

**Files:**
- Create: `supabase/migrations/20260917_review_reply_mvp.sql`
- Modify: `supabase/schema.sql`

**Interfaces:**
- Tables: `brand_profiles`, `review_drafts`, `usage_events`。
- `usage_events.request_id` unique；RLS 僅允許 authenticated user 讀自己的資料。

- [ ] 寫 SQL 檢查：欄位、索引、RLS policy、authenticated grants。
- [ ] 執行本地 SQL／schema verification，先確認檢查可捕捉缺漏。
- [ ] 加入 additive tables、constraints、indexes 與 policies。
- [ ] 驗證同一 request ID 不會重複建立 usage event。

### Task 3: 建立 review draft API boundary

**Files:**
- Create: `supabase/review-draft-service.ts`
- Create: `supabase/review-draft-service.test.ts`
- Modify: `supabase/ingest-service.ts`（僅共用既有型別／驗證，不改 Reddit ingest 行為）

**Interfaces:**
- `generateReviewDraft(input: {asin:string|null; stars:number; reviewText:string; brandProfileId:string|null; extraInstruction:string|null; requestId:string}): Promise<{draft:string; analysis:string; warnings:string[]; usageEventId:string}>`。

- [ ] 測試拒絕非 1–3 星、空評論與重複 request ID。
- [ ] 測試模型輸出含虛構退款／認證時產生 warning 並拒絕不安全草稿。
- [ ] 實作 Zod 等價輸入驗證、方案額度檢查、模型輸出 schema 驗證與原子扣額度。
- [ ] 測試 timeout／格式錯誤不產生成功 usage event。
- [ ] 測試 authenticated user 不能讀取另一使用者的 draft。

### Task 4: 串接 Extension Copilot 與填入流程

**Files:**
- Create: `extension/content/amazon-copilot.js`
- Create: `extension/content/amazon-copilot.css`
- Modify: `extension/popup/popup.html`
- Modify: `extension/popup/popup.js`

**Interfaces:**
- Adapter 呼叫後端並消費 Task 3 的 JSON contract；填入只呼叫 `fillReply`，不得呼叫 submit/click。

- [ ] 測試面板顯示星級、痛點分析、草稿、warning 與 usage。
- [ ] 加入 Generate、Regenerate、Fill、Copy Draft 四個明確操作。
- [ ] 實作品牌語氣與額外指示輸入，錯誤顯示 quota／subscription／network 狀態。
- [ ] 驗證 Fill 後只 dispatch input/change，不觸發送出按鈕。
- [ ] 在未辨識 DOM 時顯示 Copy Draft，禁止顯示「已填入」成功訊息。

### Task 5: 本地端驗證與回歸檢查

**Files:**
- Create: `extension/test-fixtures/amazon-seller-central-review.html`
- Create: `docs/superpowers/plans/2026-09-17-amazon-review-reply-mvp-verification.md`

- [ ] 在本地 fixture 驗證 1–3 星掃描、生成、Fill 與降級複製流程。
- [ ] 執行 Extension JavaScript tests、Supabase SQL checks、Dashboard build。
- [ ] 檢查 manifest 權限沒有擴大到 `*://*/*`。
- [ ] 檢查 git／檔案差異，確認沒有移除 Reddit、Dashboard 或既有 schema 功能。
- [ ] 記錄靜態／本地驗證結果，明確標註尚未完成真實 Amazon、Supabase deployed 與 Chrome Web Store 審核驗證。

## Deferred follow-up plans

- Reddit 貼文頁摘要與既有 Copilot 整合。
- ASIN／品牌／關鍵字主動搜尋。
- Supabase Auth、Stripe subscription webhook、Pro entitlement。
- 品牌網站語氣自動建立與 Dashboard 管理介面。
