const make = (subject, body) => ({ version: 1, subject, body });

export const emailTemplates = {
  en: { 'review-draft-ready': make('New review drafts are ready for {{brand}}', 'You have {{count}} review draft(s) ready to review in AMZ Leads Radar.') },
  'zh-TW': { 'review-draft-ready': make('{{brand}} 有新的評論草稿待審閱', 'AMZ Leads Radar 有 {{count}} 則評論草稿待您審閱。') },
  'zh-CN': { 'review-draft-ready': make('{{brand}} 有新的评论草稿待审核', 'AMZ Leads Radar 有 {{count}} 条评论草稿待您审核。') },
  ja: { 'review-draft-ready': make('{{brand}}の新しいレビュー下書きがあります', 'AMZ Leads Radarに確認待ちのレビュー下書きが{{count}}件あります。') },
  ko: { 'review-draft-ready': make('{{brand}}에 새 리뷰 초안이 있습니다', 'AMZ Leads Radar에 검토할 리뷰 초안 {{count}}개가 있습니다.') },
  ms: { 'review-draft-ready': make('Draf ulasan baharu tersedia untuk {{brand}}', 'Terdapat {{count}} draf ulasan untuk disemak dalam AMZ Leads Radar.') },
  id: { 'review-draft-ready': make('Draf ulasan baru tersedia untuk {{brand}}', 'Ada {{count}} draf ulasan yang siap ditinjau di AMZ Leads Radar.') },
  vi: { 'review-draft-ready': make('Có bản nháp đánh giá mới cho {{brand}}', 'AMZ Leads Radar có {{count}} bản nháp đánh giá đang chờ bạn xem xét.') },
};
