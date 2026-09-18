import React from 'react';
import { Search, Filter, Layers } from 'lucide-react';
import { LeadStatus } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
  selectedSubreddit: string;
  onSubredditChange: (sub: string) => void;
  subreddits: string[];
  selectedStatus: LeadStatus | 'all';
  onStatusChange: (st: LeadStatus | 'all') => void;
  minScore: number;
  onMinScoreChange: (score: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedSubreddit,
  onSubredditChange,
  subreddits,
  selectedStatus,
  onStatusChange,
  minScore,
  onMinScoreChange
}) => {
  const statusTabs: { id: LeadStatus | 'all'; label: string }[] = [
    { id: 'all', label: '全部線索' },
    { id: 'new', label: '🟢 最新未處理' },
    { id: 'in_progress', label: '🟡 跟進中' },
    { id: 'replied', label: '🔵 已回覆' },
    { id: 'ignored', label: '⚪ 已忽略' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 mb-6 shadow-sm space-y-4">
      {/* Search & Selectors Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜尋標題、痛點摘要或關鍵字 (例如: battery, coffee, chair)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
          />
        </div>

        {/* Subreddit & Category Selectors */}
        <div className="flex items-center space-x-2">
          {/* Subreddit Filter */}
          <select
            value={selectedSubreddit}
            onChange={(e) => onSubredditChange(e.target.value)}
            className="bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">所有 Subreddits</option>
            {subreddits.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">所有品類</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Min Match Score */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-800/80 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-400">
            <span>匹配度:</span>
            <select
              value={minScore}
              onChange={(e) => onMinScoreChange(Number(e.target.value))}
              className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
            >
              <option value={0} className="bg-slate-800 text-slate-200">不限</option>
              <option value={85} className="bg-slate-800 text-slate-200">&ge; 85%</option>
              <option value={90} className="bg-slate-800 text-slate-200">&ge; 90% (極高)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center space-x-1 border-t border-slate-800/80 pt-3 overflow-x-auto no-scrollbar">
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onStatusChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
