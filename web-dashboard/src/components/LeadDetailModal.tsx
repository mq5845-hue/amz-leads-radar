import React, { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { Lead, ToneKey, UserProfile } from '../types';

interface LeadDetailModalProps {
  lead: Lead | null;
  profile: UserProfile;
  onClose: () => void;
  onJumpToReddit: (lead: Lead) => boolean;
  onStatusChange: (id: string, status: any) => void;
  onDraftCopied: (id: string) => void;
  onDraftDismissed: (id: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  profile,
  onClose,
  onJumpToReddit,
  onStatusChange,
  onDraftCopied,
  onDraftDismissed
}) => {
  const [activeTone, setActiveTone] = useState<ToneKey>('helpful_enthusiast');
  const [copied, setCopied] = useState(false);
  const [hasCopiedDraft, setHasCopiedDraft] = useState(false);
  const [redditAttention, setRedditAttention] = useState(false);

  useEffect(() => {
    setActiveTone('helpful_enthusiast');
    setCopied(false);
    setHasCopiedDraft(false);
    setRedditAttention(false);
  }, [lead?.id]);

  if (!lead) return null;

  // Substitute variables
  const getDraftWithVariables = (text: string) => {
    let result = text;
    const replacement = profile.store_url 
      ? `[${profile.brand_name || 'Our Recommendation'}](${profile.store_url})`
      : `[${profile.brand_name || 'Your Brand Link'}]`;
    return result.replace(/\[Your Brand \/ Link\]/g, replacement);
  };

  const currentDraft = getDraftWithVariables(lead.replies[activeTone] || lead.suggested_reply);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentDraft);
      setCopied(true);
      setHasCopiedDraft(true);
      onDraftCopied(lead.id);
      setRedditAttention(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClose = () => {
    if (!hasCopiedDraft) onDraftDismissed(lead.id);
    onClose();
  };

  const tones: { key: ToneKey; title: string; desc: string; icon: string }[] = [
    {
      key: 'helpful_enthusiast',
      title: '💡 客觀熱心網友',
      desc: '以第三方視角科普產品規格與避坑點，軟性植入推薦，最不易引起反感',
      icon: '💡'
    },
    {
      key: 'fellow_sufferer',
      title: '🤝 同病相憐買家',
      desc: '共鳴原帖差評痛點，隨後真誠分享更換品牌後的親身體驗',
      icon: '🤝'
    },
    {
      key: 'tech_pro_solution',
      title: '🛠 技術專家解方',
      desc: '從材料、電路或結構工程角度剖析問題，建立專業信任度',
      icon: '🛠'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="lead-detail-title">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-slate-900/90">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
                {lead.subreddit}
              </span>
              <span className="text-xs text-slate-400">作者: u/{lead.author}</span>
              <span className="text-xs text-emerald-400 font-bold">🎯 {lead.match_score}% 匹配</span>
            </div>
            <h2 id="lead-detail-title" className="text-lg font-bold text-white leading-snug">{lead.title}</h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="關閉線索詳情"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* AI Pain Point Section */}
          <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 mb-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Google Gemini 2.5 Flash 核心痛點拆解：</span>
            </div>
            <p className="text-sm text-amber-200 leading-relaxed">
              {lead.painpoint_summary}
            </p>
          </div>

          {/* Original Reddit Post Content */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Reddit 原文內容預覽
            </label>
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed max-h-40 overflow-y-auto font-mono">
              {lead.content_raw}
            </div>
          </div>

          {/* AI Persona Tone Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI 預擬回覆話術（語氣切換）</span>
              </label>
              <span className="text-[11px] text-slate-500">
                已自動代入您的品牌：<strong className="text-slate-300">{profile.brand_name || '預設品牌'}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
              {tones.map((tone) => (
                <button
                  key={tone.key}
                  onClick={() => {
                    setActiveTone(tone.key);
                    setCopied(false);
                    setHasCopiedDraft(false);
                    onDraftDismissed(lead.id);
                    setRedditAttention(false);
                  }}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${
                    activeTone === tone.key
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm shadow-indigo-500/20'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-slate-200 mb-1">{tone.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{tone.desc}</div>
                </button>
              ))}
            </div>

            {/* Editable Draft Preview */}
            <div className="relative">
              <textarea
                readOnly
                value={currentDraft}
                rows={5}
                className="w-full p-4 pb-14 rounded-xl bg-slate-950 border border-slate-700/80 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans focus:outline-none resize-none"
              />
              <button
                onClick={handleCopy}
                className={`copy-action-glow ${!copied && currentDraft.trim() ? 'copy-draft-attention' : ''} absolute right-3 bottom-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs text-slate-200 flex items-center space-x-1 transition-all`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">已複製</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製草稿</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>真人審核機制：外掛輔助填入，手動點擊發布，100% 避免封號</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                onStatusChange(lead.id, 'replied');
                handleClose();
              }}
              className="px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
            >
              標記為已回覆
            </button>
            <button
              onClick={() => {
                if (onJumpToReddit(lead)) {
                  setRedditAttention(false);
                  handleClose();
                }
              }}
              id="btn-jump-reddit"
              className={`copy-action-glow ${redditAttention ? 'reddit-action-attention' : ''} px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 flex items-center space-x-2 shadow-lg shadow-indigo-600/30`}
            >
              <span>前往 Reddit 並喚醒 Copilot</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
