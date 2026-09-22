const en = {
  common: {
    actions: { save: 'Save', cancel: 'Cancel', close: 'Close', retry: 'Retry' },
    status: { loading: 'Loading…', ready: 'Ready' },
  },
  dashboard: {
    navigation: { overview: 'Overview', settings: 'Settings' },
    actions: { generateDraft: 'Generate draft', copyDraft: 'Copy draft' },
    quota: { remaining: '{{count}} generations remaining' },
  },
  errors: {
    ROUTE_NOT_FOUND: 'The requested route was not found.',
    UNSUPPORTED_REVIEW_INPUT: 'Only 1–3 star reviews with text are supported.',
    REQUEST_ID_REQUIRED: 'A request ID is required.',
    AUTHENTICATED_SESSION_REQUIRED: 'Please sign in to continue.',
    REVIEW_GENERATION_QUOTA_EXCEEDED: 'Your review generation quota has been reached.',
    UNKNOWN: 'Something went wrong. Please try again.',
  },
};

const zhTW = {
  common: {
    actions: { save: '儲存', cancel: '取消', close: '關閉', retry: '重試' },
    status: { loading: '載入中…', ready: '就緒' },
  },
  dashboard: {
    navigation: { overview: '總覽', settings: '設定' },
    actions: { generateDraft: '產生草稿', copyDraft: '複製草稿' },
    quota: { remaining: '剩餘 {{count}} 次產生額度' },
  },
  errors: {
    ROUTE_NOT_FOUND: '找不到要求的路由。',
    UNSUPPORTED_REVIEW_INPUT: '目前只支援有文字內容的一至三星評論。',
    REQUEST_ID_REQUIRED: '需要提供要求 ID。',
    AUTHENTICATED_SESSION_REQUIRED: '請登入後繼續。',
    REVIEW_GENERATION_QUOTA_EXCEEDED: '已達評論草稿產生額度。',
    UNKNOWN: '發生錯誤，請稍後再試。',
  },
};

const translations = {
  'zh-CN': {
    common: { actions: { save: '保存', cancel: '取消', close: '关闭', retry: '重试' }, status: { loading: '加载中…', ready: '就绪' } },
    dashboard: { navigation: { overview: '总览', settings: '设置' }, actions: { generateDraft: '生成草稿', copyDraft: '复制草稿' }, quota: { remaining: '剩余 {{count}} 次生成额度' } },
    errors: { ROUTE_NOT_FOUND: '找不到请求的路由。', UNSUPPORTED_REVIEW_INPUT: '目前只支持有文字内容的一至三星评论。', REQUEST_ID_REQUIRED: '需要提供请求 ID。', AUTHENTICATED_SESSION_REQUIRED: '请登录后继续。', REVIEW_GENERATION_QUOTA_EXCEEDED: '已达到评论草稿生成额度。', UNKNOWN: '发生错误，请稍后再试。' },
  },
  ja: {
    common: { actions: { save: '保存', cancel: 'キャンセル', close: '閉じる', retry: '再試行' }, status: { loading: '読み込み中…', ready: '準備完了' } },
    dashboard: { navigation: { overview: '概要', settings: '設定' }, actions: { generateDraft: '下書きを生成', copyDraft: '下書きをコピー' }, quota: { remaining: '残り {{count}} 回生成できます' } },
    errors: { ROUTE_NOT_FOUND: '指定されたルートが見つかりません。', UNSUPPORTED_REVIEW_INPUT: 'テキストを含む1〜3つ星のレビューのみ対応しています。', REQUEST_ID_REQUIRED: 'リクエストIDが必要です。', AUTHENTICATED_SESSION_REQUIRED: '続行するにはログインしてください。', REVIEW_GENERATION_QUOTA_EXCEEDED: 'レビュー下書きの生成上限に達しました。', UNKNOWN: 'エラーが発生しました。もう一度お試しください。' },
  },
  ko: {
    common: { actions: { save: '저장', cancel: '취소', close: '닫기', retry: '다시 시도' }, status: { loading: '로드 중…', ready: '준비 완료' } },
    dashboard: { navigation: { overview: '개요', settings: '설정' }, actions: { generateDraft: '초안 생성', copyDraft: '초안 복사' }, quota: { remaining: '{{count}}회 생성 가능' } },
    errors: { ROUTE_NOT_FOUND: '요청한 경로를 찾을 수 없습니다.', UNSUPPORTED_REVIEW_INPUT: '텍스트가 있는 1~3점 리뷰만 지원합니다.', REQUEST_ID_REQUIRED: '요청 ID가 필요합니다.', AUTHENTICATED_SESSION_REQUIRED: '계속하려면 로그인하세요.', REVIEW_GENERATION_QUOTA_EXCEEDED: '리뷰 초안 생성 한도에 도달했습니다.', UNKNOWN: '오류가 발생했습니다. 다시 시도해 주세요.' },
  },
  ms: {
    common: { actions: { save: 'Simpan', cancel: 'Batal', close: 'Tutup', retry: 'Cuba lagi' }, status: { loading: 'Memuatkan…', ready: 'Sedia' } },
    dashboard: { navigation: { overview: 'Gambaran keseluruhan', settings: 'Tetapan' }, actions: { generateDraft: 'Jana draf', copyDraft: 'Salin draf' }, quota: { remaining: 'Baki {{count}} penjanaan' } },
    errors: { ROUTE_NOT_FOUND: 'Laluan yang diminta tidak ditemui.', UNSUPPORTED_REVIEW_INPUT: 'Hanya ulasan 1–3 bintang dengan teks disokong.', REQUEST_ID_REQUIRED: 'ID permintaan diperlukan.', AUTHENTICATED_SESSION_REQUIRED: 'Sila log masuk untuk meneruskan.', REVIEW_GENERATION_QUOTA_EXCEEDED: 'Had penjanaan draf ulasan telah dicapai.', UNKNOWN: 'Sesuatu telah berlaku. Sila cuba lagi.' },
  },
  id: {
    common: { actions: { save: 'Simpan', cancel: 'Batal', close: 'Tutup', retry: 'Coba lagi' }, status: { loading: 'Memuat…', ready: 'Siap' } },
    dashboard: { navigation: { overview: 'Ringkasan', settings: 'Pengaturan' }, actions: { generateDraft: 'Buat draf', copyDraft: 'Salin draf' }, quota: { remaining: 'Tersisa {{count}} kali pembuatan' } },
    errors: { ROUTE_NOT_FOUND: 'Rute yang diminta tidak ditemukan.', UNSUPPORTED_REVIEW_INPUT: 'Hanya ulasan 1–3 bintang dengan teks yang didukung.', REQUEST_ID_REQUIRED: 'ID permintaan diperlukan.', AUTHENTICATED_SESSION_REQUIRED: 'Silakan masuk untuk melanjutkan.', REVIEW_GENERATION_QUOTA_EXCEEDED: 'Batas pembuatan draf ulasan telah tercapai.', UNKNOWN: 'Terjadi kesalahan. Silakan coba lagi.' },
  },
  vi: {
    common: { actions: { save: 'Lưu', cancel: 'Hủy', close: 'Đóng', retry: 'Thử lại' }, status: { loading: 'Đang tải…', ready: 'Sẵn sàng' } },
    dashboard: { navigation: { overview: 'Tổng quan', settings: 'Cài đặt' }, actions: { generateDraft: 'Tạo bản nháp', copyDraft: 'Sao chép bản nháp' }, quota: { remaining: 'Còn {{count}} lượt tạo' } },
    errors: { ROUTE_NOT_FOUND: 'Không tìm thấy đường dẫn được yêu cầu.', UNSUPPORTED_REVIEW_INPUT: 'Chỉ hỗ trợ đánh giá từ 1 đến 3 sao có nội dung.', REQUEST_ID_REQUIRED: 'Cần có mã yêu cầu.', AUTHENTICATED_SESSION_REQUIRED: 'Vui lòng đăng nhập để tiếp tục.', REVIEW_GENERATION_QUOTA_EXCEEDED: 'Đã đạt giới hạn tạo bản nháp đánh giá.', UNKNOWN: 'Đã xảy ra lỗi. Vui lòng thử lại.' },
  },
};

export const resources = {
  en,
  'zh-TW': zhTW,
  ...translations,
};

// Provider/API failures share a safe fallback sentence until copy review replaces it.
const apiErrorFallbacks = {
  ROUTE_NOT_FOUND: 'The requested route was not found.',
  UNSUPPORTED_REVIEW_INPUT: 'Only 1–3 star reviews with text are supported.',
  REQUEST_ID_REQUIRED: 'A request ID is required.',
  AI_PROVIDER_FAILED: 'The AI provider is temporarily unavailable.',
  AI_EMPTY_RESPONSE: 'The AI provider returned no draft.',
  AI_UNSAFE_RESPONSE: 'The generated draft requires manual review.',
  AUTHENTICATED_SESSION_REQUIRED: 'Please sign in to continue.',
  REVIEW_GENERATION_QUOTA_REJECTED: 'Review draft generation was not approved.',
  SUPABASE_QUOTA_CHECK_FAILED: 'Usage verification is temporarily unavailable.',
  INVALID_JSON: 'The request format is invalid.',
};
for (const locale of Object.keys(resources)) {
  for (const [code, message] of Object.entries(apiErrorFallbacks)) {
    if (!resources[locale].errors[code]) resources[locale].errors[code] = message;
  }
}
