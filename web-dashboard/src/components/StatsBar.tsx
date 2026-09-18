import React from 'react';
import { Target, ThumbsUp, MessageSquare, Flame } from 'lucide-react';
import { Lead } from '../types';

interface StatsBarProps {
  leads: Lead[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const avgMatchScore = Math.round(
    leads.reduce((acc, lead) => acc + lead.match_score, 0) / (totalLeads || 1)
  );
  const totalUpvotes = leads.reduce((acc, lead) => acc + lead.upvotes, 0);
  const totalComments = leads.reduce((acc, lead) => acc + lead.comments_count, 0);

  const stats = [
    {
      label: '今日偵測商機 Leads',
      value: totalLeads,
      unit: '篇潛在貼文',
      icon: Flame,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      label: '平均關鍵字匹配精準度',
      value: `${avgMatchScore}%`,
      unit: 'AI 高相關性',
      icon: Target,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: '原帖社群熱度 (Upvotes)',
      value: totalUpvotes.toLocaleString(),
      unit: '潛在關注買家',
      icon: ThumbsUp,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      label: '社群互動討論量 (Comments)',
      value: totalComments.toLocaleString(),
      unit: '則已觸及評論',
      icon: MessageSquare,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className={`p-4 rounded-xl border ${stat.bg} bg-slate-900/50 backdrop-blur transition-all hover:translate-y-[-2px]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-slate-500">{stat.unit}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
