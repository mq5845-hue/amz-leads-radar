# Supabase 本機設定

這個專案的 API 不會把 Supabase key 寫死在程式碼，也不會把 service role key 放進 Extension。

## 設定方式

將 `api/.env.example` 的變數設定到本機 process environment：

```powershell
$env:SUPABASE_URL = 'https://your-project-ref.supabase.co'
$env:SUPABASE_ANON_KEY = 'your-public-anon-key'
```

`SUPABASE_ANON_KEY` 是公開 client key；API 仍需要請求中的使用者 session：

```http
Authorization: Bearer <user-access-token>
```

API 會把 session 傳給 quota RPC，由 Supabase 的 `auth.uid()` 和 RLS 判斷使用者身份。

## 尚未設定時

若兩個 Supabase 變數都未設定，API 維持 local demo 模式。
若只設定其中一個，API 會拒絕未完成 Supabase 認證的 draft request，不會退回未扣 quota 的成功結果。

不要將 access token、anon key 或 service role key 貼到聊天、commit 或 Extension 原始碼中。
