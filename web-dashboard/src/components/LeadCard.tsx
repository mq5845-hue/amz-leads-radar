import React from 'react';
import { ExternalLink, ThumbsUp, MessageSquare, AlertCircle, Bot, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Lead, LeadStatus } from '../types';

interface LeadCardProps {
  lead: Lead;
  onOpenDetail: (lead: Lead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onJumpToReddit: (lead: Lead) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onOpenDetail,
  onStatusChange,
  onJumpToReddit
}) => {
  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          🎯 {score}% 匹配
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
        🎯 {score}% 匹配
      </span>
    );
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">新商機</span>;
      case 'in_progress':
        return <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">處理中</span>;
      case 'replied':
        return <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">已回覆</span>;
      case 'ignored':
        return <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700 font-medium">已忽略</span>;
    }
  };

  // Format relative time roughly
  const formatTime = (isoString: string) => {
    const diffHours = Math.round((Date.now() - new Date(isoString).getTime()) / (1000 * 3600));
    if (diffHours <= 1) return '剛剛';
    if (diffHours < 24) return `${diffHours} 小時前`;
    return `${Math.round(diffHours / 24)} 天前`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-5 shadow-sm transition-all hover:shadow-lg hover:shadow-black/40 flex flex-col justify-between group">
      {/* Top Meta Header */}
      <div>
        <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
              {lead.subreddit}
            </span>
            <span className="text-xs text-slate-500 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatTime(lead.created_at)}</span>
            </span>
            {getStatusBadge(lead.status)}
          </div>
          {getScoreBadge(lead.match_score)}
        </div>

        {/* Post Title */}
        <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-3">
          {lead.title}
        </h3>

        {/* Pain Point Highlight Box (AI 痛點核心摘要) */}
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-lg p-3 mb-3.5">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 mb-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>AI 提煉買家痛點 / 差評關鍵：</span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed font-normal">
            {lead.painpoint_summary}
          </p>
        </div>

        {/* Matched Keywords Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lead.keyword_matches.map((kw, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Metrics & Actions */}
      <div className="border-t border-slate-800/80 pt-3.5 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Heat Metrics */}
        <div className="flex items-center space-x-4 text-xs text-slate-400">
          <span className="flex items-center space-x-1 hover:text-slate-200 transition-colors" title="Reddit 貼文讚數">
            <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-slate-200">{lead.upvotes}</span>
          </span>
          <span className="flex items-center space-x-1 hover:text-slate-200 transition-colors" title="Reddit 討論留言數">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-slate-200">{lead.comments_count}</span>
          </span>
          <span className="text-[11px] text-slate-500">
            類別: {lead.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Quick Preview */}
          <button
            onClick={() => onOpenDetail(lead)}
            className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-all flex items-center space-x-1"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>預擬回覆</span>
          </button>

          {/* Jump to Reddit & Open Copilot */}
          <button
            onClick={() => onJumpToReddit(lead)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-all flex items-center space-x-1.5 active:scale-95"
            title="跳轉至 Reddit 原文並啟動瀏覽器 Copilot 輔助回覆"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>前往 Reddit 回覆</span>
            <ExternalLink className="w-3 h-3 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};
