# AMZ Leads Radar Windows 依賴工作區規範

更新日期：2026-09-22

## 結論

Google Drive 目錄只作為原始碼同步／保存來源；Git、`npm ci`、Vite watcher、build 與依賴檔案操作固定在本機 NTFS checkout 執行。

正式本機 checkout 建議使用：

```text
C:\Users\<使用者>\AppData\Local\AMZ-Leads-Radar\checkout
```

現有的 `C:\Users\<使用者>\AppData\Local\AMZ-Leads-Radar\repo-verify` 是成功的 NTFS 驗證副本，但它不是 Git checkout，先保留作為基線，不要直接改造成正式 checkout。

## 為什麼不把依賴留在 Google Drive

這次同一份 `package.json`／lockfile 在 C: NTFS 可乾淨安裝 146 packages，完整本地 contract suite 36/36、Vite build、TypeScript 與 audit 均成功；Drive／工作樹則曾出現 `TAR_ENTRY_ERROR`、`EBUSY`、`EPERM`，最後只剩 3,505 個檔案的 `node_modules.corrupt-20260922`。這是依賴解壓與同步檔案系統競態的環境邊界，不是應以重寫應用程式來處理的程式錯誤。

目前 Drive 上若已有可執行的 `node_modules`，只代表該份目錄當下可讀；不代表下一次 `npm ci`、同步、watcher 或原子 rename 仍然可靠。

## 建立正式 NTFS checkout

在目前 Git／Google Drive checkout 根目錄執行；腳本會建立新的目標目錄，不會覆蓋已存在的目錄：

```powershell
.\scripts\prepare-ntfs-checkout.ps1 `
  -SourceRoot 'G:\我的雲端硬碟\AIOS-Core\workspace\projects\2026-09-16--AMZ Leads Radar' `
  -TargetRoot "$env:LOCALAPPDATA\AMZ-Leads-Radar\checkout" `
  -Install
```

腳本行為：

- 從 `origin` 的 `main` 建立真正的 Git checkout。
- 以 `robocopy /E` 將來源的程式與文件覆蓋到 NTFS，但不使用 `/MIR`，不刪除目標檔案。
- 不複製 `.git`、`node_modules`、損壞依賴備份、`dist`、`.vercel`、`.env*`、金鑰與 log。
- `robocopy` exit code 0–7 視為成功；8 以上才中止。
- 只有傳入 `-Install` 才會在 NTFS checkout 執行 `npm ci`。

正式 checkout 建立後，所有程式修改、Git commit 與本地驗證都以 C: checkout 為準；Google Drive 只保留來源與文件同步。若來源含尚未 commit 的程式，overlay 後會在 NTFS checkout 顯示為 modified，必須先 review 再 commit。

## 重跑完整本地驗證

```powershell
.\scripts\verify-ntfs-workspace.ps1 `
  -WorkspaceRoot "$env:LOCALAPPDATA\AMZ-Leads-Radar\checkout"
```

驗證腳本固定執行：

1. `npm ci --no-audit --no-fund`
2. CI 定義的 13 個本地 contract test 檔案
3. `npm run build`
4. `npx tsc --noEmit`
5. `npm audit --audit-level=moderate`

它不會執行 live Supabase smoke，也不會輸出或要求憑證。缺少 live secrets 時，使用既有的 `live-preflight`；live Auth/RLS、Vercel、Amazon Seller Central 與 Chrome Web Store 仍須分開驗證。

## Junction：可逆但不作正式方案

若只是為了讓 Drive 上的舊原始碼暫時讀到 NTFS 依賴，可以在確認 Drive 端 `web-dashboard\node_modules` 不存在後建立 Junction：

```powershell
$driveDeps = 'G:\我的雲端硬碟\AIOS-Core\workspace\projects\2026-09-16--AMZ Leads Radar\web-dashboard\node_modules'
$ntfsDeps = "$env:LOCALAPPDATA\AMZ-Leads-Radar\repo-verify\web-dashboard\node_modules"
New-Item -ItemType Junction -Path $driveDeps -Target $ntfsDeps
```

移除時只移除 Junction 本身，不要遞迴刪除 target：

```powershell
Remove-Item -LiteralPath $driveDeps
```

Junction 仍可能被同步工具、watcher 或 npm 自身重新命名／替換，路徑也會綁定到單一電腦；因此禁止在 Drive 根目錄執行 `npm ci`，也不把 Junction 當成 Git／正式開發 checkout。它只適合短期讀取或過渡，不是長期方案。

## 已知踩坑與保護規則

- 不要把 `node_modules`、`node_modules.corrupt-*`、`dist`、`.env`、私鑰或 access token commit 到 Git。
- 不要用 `/MIR` 將 Drive 來源同步到 NTFS；它可能刪除 NTFS 上的 review／本機資料。
- 既有損壞依賴目錄先保留作證據，不要在未確認路徑前遞迴刪除。
- 本機測試與 build 只證明程式碼在 NTFS 可驗證，不等於 live Supabase、部署、Amazon DOM 或 Chrome Web Store 已通過。
- 這次處理沒有 push、部署、Supabase migration 或生產設定變更。
