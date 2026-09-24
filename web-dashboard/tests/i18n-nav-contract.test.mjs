import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const dashboardRoot = path.resolve(import.meta.dirname, '..');
const indexHtml = fs.readFileSync(path.join(dashboardRoot, 'index.html'), 'utf8');

test('dashboard exposes the multilingual navigation and full UI translation layer', () => {
  assert.match(indexHtml, /id="locale-menu"/);
  assert.match(indexHtml, /data-lucide="globe-2"/);
  assert.match(indexHtml, /src="\/i18n\/legacy-i18n\.mjs"/);
  assert.match(indexHtml, /data-i18n="scan"/);
  assert.match(indexHtml, /class="[^"]*hover-glow-card/);
  assert.match(indexHtml, /class="[^"]*review-card/);

  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi']) {
    assert.match(indexHtml, new RegExp(`data-locale="${locale}"`));
  }
});

test('legacy translation runtime covers every supported locale and dynamic UI', () => {
  const runtimePath = path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs');
  assert.equal(fs.existsSync(runtimePath), true, 'legacy translation runtime is missing');
  const runtime = fs.readFileSync(runtimePath, 'utf8');
  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi']) {
    assert.match(runtime, new RegExp(`['\\"]?${locale}['\\"]?\\s*:`), `${locale} dictionary is missing`);
  }
  assert.match(runtime, /translateUi/);
  assert.match(runtime, /amz-locale-change/);
});

test('dynamic renderers use locale-aware translations instead of a post-render DOM walker', () => {
  const runtimePath = path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs');
  const runtime = fs.readFileSync(runtimePath, 'utf8');
  assert.match(runtime, /function translateText/);
  assert.match(runtime, /\bt:\s*\(/);
  assert.doesNotMatch(runtime, /createTreeWalker|MutationObserver/);
  assert.match(indexHtml, /function uiText\(/);
  assert.match(indexHtml, /uiText\('今日偵測商機 Leads'\)/);
  assert.match(indexHtml, /addEventListener\('amz-locale-change'/);
});

test('browser-facing page metadata, accessibility labels, and native alerts use the locale layer', () => {
  assert.match(indexHtml, /<title data-i18n="[^"]+">/);
  assert.match(indexHtml, /data-i18n-aria-label="關閉登入面板"/);
  assert.match(indexHtml, /data-i18n-title="跳轉至 Reddit 原文並啟動瀏覽器 Copilot"/);
  assert.doesNotMatch(indexHtml, /alert\(\s*['"][^'"]*[\u4e00-\u9fff]/);
  assert.doesNotMatch(indexHtml, /alert\(\s*[^)]*\|\|\s*['"][^'"]*[\u4e00-\u9fff]/);
  for (const key of [
    '此線索的 Reddit 連結無效，無法跳轉。',
    '此線索不是受支援的 Reddit 連結，已阻止跳轉。',
    '今日額度已用完，無法前往 Reddit。',
    '尚未設定 Lemon Squeezy checkout URL。請先完成付款設定。',
    '品牌設定儲存失敗。',
    '✅ 品牌與店鋪設定已儲存！',
  ]) {
    assert.match(fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8'), new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('localized entrypoints exist for every supported navigation locale', () => {
  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi']) {
    const entrypoint = path.join(dashboardRoot, 'public', locale, 'index.html');
    assert.equal(fs.existsSync(entrypoint), true, `${locale} entrypoint is missing`);
  }
});

test('the footer exposes a localized website statement and language-menu accessibility text', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  assert.match(indexHtml, /<span class="sr-only" data-i18n="Language">Language<\/span>/);
  assert.match(indexHtml, /data-i18n="網站聲明"/);
  assert.match(runtimeSource, /網站聲明：AMZ Leads Radar 為獨立第三方工具/);
  assert.match(runtimeSource, /Website statement: AMZ Leads Radar is an independent third-party tool/);
  assert.match(runtimeSource, /声明：AMZ Leads Radar 是独立的第三方工具/);
  assert.match(runtimeSource, /サイト声明：AMZ Leads Radar は独立した第三者ツール/);
  assert.match(runtimeSource, /웹사이트 안내: AMZ Leads Radar는 독립적인 제3자 도구/);
  assert.match(runtimeSource, /Pernyataan laman web: AMZ Leads Radar ialah alat pihak ketiga bebas/);
  assert.match(runtimeSource, /Pernyataan situs: AMZ Leads Radar adalah alat pihak ketiga independen/);
  assert.match(runtimeSource, /Tuyên bố trang web: AMZ Leads Radar là công cụ bên thứ ba độc lập/);
});

test('the footer website statement opens a localized dialog with keyboard and backdrop close behavior', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  assert.match(indexHtml, /id="footer-statement-trigger"/);
  assert.match(indexHtml, /onclick="openStatementModal\(\)"/);
  assert.match(indexHtml, /id="statement-modal"[^>]*role="dialog"/);
  assert.match(indexHtml, /onclick="closeStatementModal\(\)"/);
  assert.match(indexHtml, /onkeydown="handleStatementKeydown\(event\)"/);
  assert.match(indexHtml, /function openStatementModal\(\)/);
  assert.match(indexHtml, /function closeStatementModal\(\)/);
  assert.match(indexHtml, /function handleStatementKeydown\(event\)/);
  assert.match(runtimeSource, /'網站聲明標題': 'Website statement'/);
  assert.match(runtimeSource, /'網站聲明標題': '網站聲明'/);
});

test('the footer exposes four localized policy entry points with an app-owned modal', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  for (const policyKey of ['Cookie Policy', 'Privacy Policy', 'Refund and Cancellation Policy', 'Terms of Service / Terms and Conditions']) {
    assert.match(indexHtml, new RegExp(`data-i18n="${policyKey.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}"`));
  }
  assert.match(indexHtml, /id="footer-policy-links"/);
  assert.match(indexHtml, /data-policy-key="cookie"[^>]*onclick="openPolicyModal\('cookie'\)"/);
  assert.match(indexHtml, /data-policy-key="privacy"[^>]*onclick="openPolicyModal\('privacy'\)"/);
  assert.match(indexHtml, /data-policy-key="refund"[^>]*onclick="openPolicyModal\('refund'\)"/);
  assert.match(indexHtml, /data-policy-key="terms"[^>]*onclick="openPolicyModal\('terms'\)"/);
  assert.match(indexHtml, /id="policy-modal"[^>]*role="dialog"/);
  assert.match(indexHtml, /function openPolicyModal\(policyKey\)/);
  assert.match(indexHtml, /function closePolicyModal\(\)/);
  assert.match(runtimeSource, /'Cookie Policy': 'Cookie 政策'/);
  assert.match(runtimeSource, /'Privacy Policy': '隱私權政策'/);
  assert.match(runtimeSource, /'Refund and Cancellation Policy': '退款與取消政策'/);
  assert.match(runtimeSource, /'Terms of Service \/ Terms and Conditions': '服務條款／條件'/);
  assert.match(runtimeSource, /'Cookie Policy': 'Cookie Policy'/);
  assert.match(indexHtml, /data-policy-key="cookie"[^>]*class="[^"]*text-slate-400[^"]*hover-glow-card/);
  assert.match(indexHtml, /data-policy-key="privacy"[^>]*class="[^"]*text-slate-400[^"]*hover-glow-card/);
  assert.match(indexHtml, /data-policy-key="refund"[^>]*class="[^"]*text-slate-400[^"]*hover-glow-card/);
  assert.match(indexHtml, /data-policy-key="terms"[^>]*class="[^"]*text-slate-400[^"]*hover-glow-card/);
  assert.match(indexHtml, /id="footer-statement-trigger"[^>]*class="[^"]*text-slate-400[^"]*hover-glow-card/);
});

test('card and rounded-label hover glow is reduced to half strength', () => {
  assert.match(indexHtml, /\.hover-glow-card:hover \{[^}]*filter: brightness\(1\.25\)/);
  assert.match(indexHtml, /\.hover-glow-card:hover \{[^}]*rgba\(99, 102, 241, \.29\)/);
  assert.match(indexHtml, /\.hover-glow-card:hover \{[^}]*rgba\(56, 189, 248, \.13\)/);
  assert.match(indexHtml, /\.review-card:hover \{[^}]*filter: brightness\(1\.25\)/);
  assert.match(indexHtml, /\.review-card:hover \{[^}]*rgba\(99, 102, 241, \.29\)/);
  assert.match(indexHtml, /\.review-card:hover \{[^}]*rgba\(56, 189, 248, \.13\)/);
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  assert.match(sharedStyles, /\.hover-glow-card:hover/);
  assert.match(sharedStyles, /\.review-card:hover/);
  assert.match(sharedStyles, /\.locale-menu-option:hover/);
  assert.match(sharedStyles, /\.brand-name-hover:hover/);
});

test('copy actions share the visible hover and keyboard focus glow', () => {
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  const reactModal = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadDetailModal.tsx'), 'utf8');
  assert.match(indexHtml, /id="btn-copy-draft"[^>]*class="[^"]*copy-action-glow/);
  assert.match(indexHtml, /id="modal-draft-area"[^>]*class="[^"]*pb-14/);
  assert.match(indexHtml, /class="absolute right-3 bottom-3 flex items-center space-x-1\.5"[\s\S]*?id="btn-copy-draft"/);
  assert.match(reactModal, /className=\{`copy-action-glow/);
  assert.match(reactModal, /className="[^"]*pb-14/);
  assert.match(reactModal, /className="absolute right-3 bottom-3 flex items-center space-x-1\.5"/);
  assert.match(sharedStyles, /\.copy-action-glow:hover,\s*\.copy-action-glow:focus-visible/);
  assert.match(sharedStyles, /\.copy-action-glow:hover,\s*\.copy-action-glow:focus-visible[^}]*box-shadow:/s);
  assert.match(sharedStyles, /\.copy-action-glow:active[^}]*transform:/s);
});

test('copy draft actions pulse twice per second after a draft appears', () => {
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  const reactModal = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadDetailModal.tsx'), 'utf8');
  assert.match(sharedStyles, /@keyframes copy-draft-pulse/);
  assert.match(sharedStyles, /\.copy-draft-attention\s*\{[^}]*animation:\s*copy-draft-pulse\s+\.5s\s+ease-in-out\s+infinite/s);
  assert.match(sharedStyles, /\.copy-draft-attention\s*\{[^}]*animation:\s*copy-draft-pulse\s+\.5s\s+ease-in-out\s+infinite\s*!important/s);
  assert.match(indexHtml, /function setCopyDraftAttention\(active\)/);
  assert.match(indexHtml, /setCopyDraftAttention\(Boolean\(draft\.trim\(\)\)\)/);
  assert.match(indexHtml, /setCopyDraftAttention\(false\)/);
  assert.match(reactModal, /copy-draft-attention/);
});

test('copy draft reminders include a synchronized assistant avatar', () => {
  const reactModal = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadDetailModal.tsx'), 'utf8');
  assert.match(indexHtml, /id="avatar-copy-draft"[^>]*draft-helper-avatar/);
  assert.match(indexHtml, /function setCopyDraftAttention\(active\)[\s\S]*?draft-helper-avatar-attention/);
  assert.match(reactModal, /src="\/favicon-head-transparent\.png"/);
  assert.match(reactModal, /draft-helper-avatar-attention/);
  assert.match(reactModal, /id="btn-copy-draft"/);
});

test('copy completion hands the seller reminder to the Reddit action', () => {
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  const reactModal = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadDetailModal.tsx'), 'utf8');
  assert.match(sharedStyles, /\.reddit-action-attention\s*\{[^}]*animation:\s*copy-draft-pulse\s+\.5s\s+ease-in-out\s+infinite\s*!important/s);
  assert.match(indexHtml, /id="btn-jump-reddit"/);
  assert.match(indexHtml, /function setRedditActionAttention\(active\)/);
  assert.match(indexHtml, /await navigator\.clipboard\.writeText\(text\);[\s\S]*setRedditActionAttention\(true\)/);
  assert.match(indexHtml, /function jumpFromModal\(\)[\s\S]*setRedditActionAttention\(false\)/);
  assert.match(reactModal, /reddit-action-attention/);
  assert.match(reactModal, /setRedditAttention\(true\)/);
  assert.match(reactModal, /setRedditAttention\(false\)/);
});

test('draft preview card actions keep pulsing until the draft is copied', () => {
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  const reactCard = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadCard.tsx'), 'utf8');
  const reactApp = fs.readFileSync(path.join(dashboardRoot, 'src', 'App.tsx'), 'utf8');
  const reactModal = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadDetailModal.tsx'), 'utf8');
  assert.match(sharedStyles, /\.draft-action-attention\s*\{[^}]*animation:\s*copy-draft-pulse\s+\.5s\s+ease-in-out\s+infinite\s*!important/s);
  assert.match(indexHtml, /id="btn-draft-reply-\$\{encodedLeadId\}"[^>]*draft-action-attention/);
  assert.match(indexHtml, /function setDraftCardAttention\(leadId, active\)/);
  assert.match(indexHtml, /function openDetailModal\(leadId\)[\s\S]*?setDraftCardAttention\(leadId, false\)/);
  assert.match(indexHtml, /function closeDetailModal\(\)[\s\S]*?currentLeadDraftCopied[\s\S]*?setDraftCardAttention\(currentLead\.id, true\)/);
  assert.match(indexHtml, /currentLeadDraftCopied = true/);
  assert.match(reactCard, /draft-action-attention/);
  assert.match(reactApp, /draftReminderSuppressed/);
  assert.match(reactApp, /onDraftDismissed/);
  assert.match(reactModal, /onDraftDismissed/);
  assert.match(reactModal, /hasCopiedDraft/);
});

test('draft preview actions include the warm assistant avatar beside the button', () => {
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  const reactCard = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadCard.tsx'), 'utf8');
  assert.match(sharedStyles, /\.draft-helper-avatar-attention\s*\{[^}]*animation:\s*copy-draft-pulse\s+\.5s\s+ease-in-out\s+infinite\s*!important/s);
  assert.match(indexHtml, /draft-helper-avatar/);
  assert.match(indexHtml, /favicon-head-transparent\.png/);
  assert.match(indexHtml, /draft-helper-avatar-attention/);
  assert.match(indexHtml, /draft-action-attention[^>]*px-3/);
  assert.match(indexHtml, /function setDraftCardAttention\(leadId, active\)[\s\S]*?draft-helper-avatar-attention/);
  assert.match(reactCard, /draft-helper-avatar/);
  assert.match(reactCard, /src="\/favicon-head-transparent\.png"/);
  assert.match(reactCard, /draft-helper-avatar-attention/);
  assert.match(reactCard, /draft-action-attention/);
});

test('copy feedback is localized in every supported locale', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  for (const translated of ['Copied!', '已複製！', '已复制！', 'コピーしました！', '복사됨!', 'Disalin!', 'Tersalin!', 'Đã sao chép!']) {
    assert.match(runtimeSource, new RegExp(`'已複製！': '${translated.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`));
  }
});

test('copy failure is handled without claiming success', () => {
  assert.match(indexHtml, /async function copyDraftText\(\)/);
  assert.match(indexHtml, /await navigator\.clipboard\.writeText\(text\)/);
  assert.match(indexHtml, /複製失敗，請手動複製。/);
  assert.match(indexHtml, /catch \{/);
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  for (const translated of ['Copy failed. Please copy manually.', '複製失敗，請手動複製。', '复制失败，请手动复制。', 'コピーに失敗しました。手動でコピーしてください。', '복사에 실패했습니다. 직접 복사해 주세요.', 'Salinan gagal. Sila salin secara manual.', 'Penyalinan gagal. Silakan salin secara manual.', 'Sao chép thất bại. Vui lòng sao chép thủ công.']) {
    assert.match(runtimeSource, new RegExp(`'複製失敗，請手動複製。': '${translated.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`));
  }
});

test('interactive dialogs share Escape, backdrop close, and focus restoration behavior', () => {
  for (const id of ['lead-modal', 'upgrade-modal', 'settings-modal']) {
    assert.match(indexHtml, new RegExp(`id="${id}"[^>]*role="dialog"`));
    assert.match(indexHtml, new RegExp(`id="${id}"[^>]*tabindex="-1"`));
  }
  for (const handler of ['handleDetailBackdrop', 'handleDetailKeydown', 'handleUpgradeBackdrop', 'handleUpgradeKeydown', 'handleSettingsBackdrop', 'handleSettingsKeydown']) {
    assert.match(indexHtml, new RegExp(`function ${handler}\\(`));
  }
  assert.match(indexHtml, /let leadReturnFocus = null;/);
  assert.match(indexHtml, /let upgradeReturnFocus = null;/);
  assert.match(indexHtml, /let settingsReturnFocus = null;/);
  assert.match(indexHtml, /function closeDetailModal\(\)[\s\S]*?leadReturnFocus/);
  assert.match(indexHtml, /function closeUpgradeModal\(\)[\s\S]*?upgradeReturnFocus/);
  assert.match(indexHtml, /function closeSettingsModal\(\)[\s\S]*?settingsReturnFocus/);
});

test('draft modal exposes a localized return-home action beside mark replied', () => {
  const reactModal = fs.readFileSync(path.join(dashboardRoot, 'src', 'components', 'LeadDetailModal.tsx'), 'utf8');
  assert.match(indexHtml, /function returnToHome\(\)[\s\S]*?closeDetailModal\(\)[\s\S]*?window\.scrollTo/);
  assert.match(indexHtml, /<button onclick="returnToHome\(\)"[\s\S]*?data-lucide="arrow-left"[\s\S]*?data-i18n="回到首頁"/);
  assert.match(indexHtml, /returnToHome\(\)[\s\S]*?標記為已回覆/);
  assert.match(reactModal, /ArrowLeft/);
  assert.match(reactModal, /window\.scrollTo/);
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  for (const [locale, translated] of [['en', 'Back to home'], ['zh-TW', '回到首頁'], ['zh-CN', '返回首页'], ['ja', 'ホームに戻る'], ['ko', '홈으로 돌아가기'], ['ms', 'Kembali ke halaman utama'], ['id', 'Kembali ke beranda'], ['vi', 'Về trang chủ']]) {
    const localeKey = locale.includes('-') ? `'${locale}'` : locale;
    assert.match(runtimeSource, new RegExp(`${localeKey}: '${translated.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&')}'`));
  }
});

test('common badges, filters, and auth fields do not retain mixed-language UI copy', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  assert.match(indexHtml, /<label for="auth-email"[^>]*data-i18n="Email"/);
  assert.match(indexHtml, /<label for="auth-password"[^>]*data-i18n="Password"/);
  assert.match(indexHtml, /data-i18n-placeholder="Supabase Auth password"/);
  assert.match(indexHtml, /id="btn-upgrade-top"[^>]*data-i18n-aria-label="升級 Pro 專業版"[^>]*aria-label="升級 Pro 專業版"/);
  assert.match(runtimeSource, /'Email': '電子郵件'/);
  assert.match(runtimeSource, /'Password': '密碼'/);
  assert.match(runtimeSource, /'所有 Subreddits': '所有社群'/);
  assert.match(runtimeSource, /'今日偵測商機 Leads': '今日检测商机'/);
  assert.match(runtimeSource, /'Free 體驗方案': '免費體驗方案'/);
  assert.match(runtimeSource, /'原帖社群熱度 \(Upvotes\)': '原帖社群熱度（讚數）'/);
  assert.match(runtimeSource, /'社群互動討論量 \(Comments\)': '社群互動討論量（留言）'/);
  assert.match(runtimeSource, /'✔ 3 種專業話術語氣 \+ 自訂 Prompt': '✔ 3 種專業話術語氣 \+ 自訂提示詞'/);
  assert.match(runtimeSource, /'Demo mode': '示範模式'/);
  assert.match(runtimeSource, /'Demo mode • 尚未登入': '示範模式 • 尚未登入'/);
  assert.match(runtimeSource, /'請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。': '請嘗試放寬關鍵字搜尋、調整社群篩選或重設匹配度門檻。'/);
  assert.match(indexHtml, /badge\.textContent = uiText\('Demo mode'\)/);
  assert.match(indexHtml, /opt\.textContent = uiText\(cat\)/);
  assert.match(indexHtml, /escapeHtml\(uiText\(lead\.category\)\)/);
  assert.match(runtimeSource, /'Electronics': '電子產品'/);
  assert.match(runtimeSource, /'Electronics': '电子产品'/);
});

test('toolbar tooltip labels are translated in every supported locale', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  for (const [scanLabel, storeLabel] of [
    ['Scan latest leads', 'Store and brand settings'],
    ['掃描最新線索', '店鋪與品牌設定'],
    ['扫描最新线索', '店铺与品牌设置'],
    ['最新のリードをスキャン', '店舗とブランドの設定'],
    ['최신 리드 스캔', '스토어 및 브랜드 설정'],
    ['Imbas petunjuk terkini', 'Tetapan kedai dan jenama'],
    ['Pindai prospek terbaru', 'Pengaturan toko dan merek'],
    ['Quét khách hàng tiềm năng mới nhất', 'Cài đặt cửa hàng và thương hiệu'],
  ]) {
    assert.match(runtimeSource, new RegExp(`'掃描最新線索': '${scanLabel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}'`));
    assert.match(runtimeSource, new RegExp(`'店鋪與品牌設定': '${storeLabel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}'`));
  }
});

test('mobile locale menu keeps the trigger and all language options visible', () => {
  const sharedStyles = fs.readFileSync(path.join(dashboardRoot, 'src', 'index.css'), 'utf8');
  assert.match(indexHtml, /id="amz-brand-logo"[^>]*width="40"[^>]*height="40"[^>]*fetchpriority="high"/);
  assert.match(sharedStyles, /\.amz-brand-logo-frame\s*\{[^}]*flex:\s*0 0 40px/);
  assert.match(sharedStyles, /\.amz-brand-logo\s*\{[^}]*display:\s*block/);
  assert.match(indexHtml, /@media \(max-width: 700px\)[\s\S]*?#locale-menu \{[^}]*min-width: max-content/s);
  assert.match(indexHtml, /@media \(max-width: 700px\)[\s\S]*?#locale-menu-trigger \{[^}]*white-space: nowrap/s);
  assert.match(indexHtml, /@media \(max-width: 700px\)[\s\S]*?#locale-menu-panel \{[^}]*left: 0; right: auto; width: min\(180px/s);
  assert.match(sharedStyles, /@media \(max-width: 700px\)[\s\S]*?#locale-menu-panel \{[^}]*left: 0;[\s\S]*?overflow-y: auto/s);
  for (const locale of ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'ms', 'id', 'vi']) {
    assert.match(indexHtml, new RegExp(`data-locale="${locale}"`));
  }
});

test('dynamic Reddit metric tooltips are translated in every supported locale', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  for (const [upvotesLabel, commentsLabel] of [
    ['Reddit post upvotes', 'Reddit discussion comments'],
    ['Reddit 貼文讚數', 'Reddit 討論留言數'],
    ['Reddit 帖子点赞数', 'Reddit 讨论评论数'],
    ['Reddit投稿の投票数', 'Reddit議論のコメント数'],
    ['Reddit 게시물 추천 수', 'Reddit 토론 댓글 수'],
    ['Undian siaran Reddit', 'Komen perbincangan Reddit'],
    ['Upvote postingan Reddit', 'Komentar diskusi Reddit'],
    ['Lượt tán thành bài đăng Reddit', 'Bình luận thảo luận Reddit'],
  ]) {
    assert.match(runtimeSource, new RegExp(`'Reddit 貼文讚數': '${upvotesLabel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}'`));
    assert.match(runtimeSource, new RegExp(`'Reddit 討論留言數': '${commentsLabel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}'`));
  }
});

test('AI pain-point summaries are localized in cards and detail modal while draft copy stays English', () => {
  const runtimeSource = fs.readFileSync(path.join(dashboardRoot, 'public', 'i18n', 'legacy-i18n.mjs'), 'utf8');
  assert.match(indexHtml, /uiText\(lead\.painpoint_summary, lead\.painpoint_summary\)/);
  assert.match(indexHtml, /uiText\(currentLead\.painpoint_summary, currentLead\.painpoint_summary\)/);
  for (const summary of [
    'Frequent business travel has exposed battery swelling and loose USB-C ports within months',
    '出張が多い購入者から、数か月でバッテリーが膨張しUSB-Cポートが緩むという声があり',
    '출장이 잦은 구매자들은 몇 달 만에 보조배터리가 부풀고 USB-C 포트가 헐거워진다고 불평하며',
    'Pembeli yang kerap melakukan perjalanan kerja mendapati bateri mudah alih mengembung',
    'Người mua thường xuyên đi công tác phàn nàn pin sạc dự phòng phồng lên',
  ]) {
    assert.match(runtimeSource, new RegExp(summary.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')));
  }
  assert.match(indexHtml, /suggested_reply/);
  assert.match(indexHtml, /id="modal-raw-content"/);
});

test('legacy page uses the local Tailwind pipeline instead of the CDN runtime', () => {
  const tailwindConfig = fs.readFileSync(path.join(dashboardRoot, 'tailwind.config.js'), 'utf8');
  assert.doesNotMatch(indexHtml, /cdn\.tailwindcss\.com/);
  assert.match(indexHtml, /<script type="module">\s*import ['"]\/src\/index\.css['"];?\s*<\/script>/);
  assert.doesNotMatch(indexHtml, /tailwind\.config\s*=/);
  assert.match(tailwindConfig, /fontFamily/);
});
