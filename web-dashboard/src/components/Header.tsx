import React from 'react';
import { Radar, Zap, Crown, Settings, Sparkles, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  onOpenUpgrade: () => void;
  onOpenSettings: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenUpgrade,
  onOpenSettings,
  onRefresh,
  isRefreshing
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Radar className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg text-white tracking-tight">AMZ Leads Radar</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                SaaS Copilot
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              跨境電商站外引流 (Off-Amazon Traffic) 智能商機雷達
            </p>
          </div>
        </div>

        {/* Right Action & Status Area */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all text-xs flex items-center space-x-1.5"
            title="重新掃描最新線索"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden md:inline">掃描線索</span>
          </button>

          {/* Daily Quota Counter */}
          <div className="flex items-center space-x-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 hidden sm:inline">今日回覆額度:</span>
            <span className="font-bold text-amber-300">
              {profile.plan === 'free' ? `${profile.daily_usage_left} / ${profile.max_daily_usage}` : '無限'}
            </span>
          </div>

          {/* Upgrade Button */}
          {profile.plan === 'free' && (
            <button
              onClick={onOpenUpgrade}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <Crown className="w-4 h-4 text-slate-950" />
              <span>升級 Pro 專業版</span>
            </button>
          )}

          {/* Settings / Brand Config Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all text-xs flex items-center space-x-1.5"
            title="品牌與自訂店鋪連結設定"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">{profile.brand_name || '店鋪設定'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
