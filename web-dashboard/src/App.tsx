import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { FilterBar } from './components/FilterBar';
import { LeadCard } from './components/LeadCard';
import { LeadDetailModal } from './components/LeadDetailModal';
import { UpgradeModal } from './components/UpgradeModal';
import { SettingsModal } from './components/SettingsModal';
import { MOCK_LEADS, INITIAL_PROFILE } from './data/mockLeads';
import { Lead, LeadStatus, UserProfile } from './types';
import { Radar, Sparkles, Inbox } from 'lucide-react';

export function App() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubreddit, setSelectedSubreddit] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>('all');
  const [minScore, setMinScore] = useState<number>(0);

  // Derive categories and subreddits list
  const categories = useMemo(() => {
    return Array.from(new Set(leads.map((l) => l.category)));
  }, [leads]);

  const subreddits = useMemo(() => {
    return Array.from(new Set(leads.map((l) => l.subreddit)));
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = lead.title.toLowerCase().includes(q);
        const matchesPain = lead.painpoint_summary.toLowerCase().includes(q);
        const matchesKeywords = lead.keyword_matches.some((k) => k.toLowerCase().includes(q));
        if (!matchesTitle && !matchesPain && !matchesKeywords) return false;
      }

      // Category
      if (selectedCategory !== 'all' && lead.category !== selectedCategory) {
        return false;
      }

      // Subreddit
      if (selectedSubreddit !== 'all' && lead.subreddit !== selectedSubreddit) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && lead.status !== selectedStatus) {
        return false;
      }

      // Score
      if (minScore > 0 && lead.match_score < minScore) {
        return false;
      }

      return true;
    });
  }, [leads, searchQuery, selectedCategory, selectedSubreddit, selectedStatus, minScore]);

  // Actions
  const handleStatusChange = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const handleJumpToReddit = (lead: Lead) => {
    // Deduct quota if free plan
    if (profile.plan === 'free' && profile.daily_usage_left > 0) {
      setProfile((prev) => ({
        ...prev,
        daily_usage_left: prev.daily_usage_left - 1
      }));
    }

    // Mark as in_progress
    handleStatusChange(lead.id, 'in_progress');

    // Build URL with lead context parameter
    const targetUrl = new URL(lead.reddit_url);
    targetUrl.searchParams.set('amz_radar_lead_id', lead.id);
    targetUrl.searchParams.set('brand', profile.brand_name || '');
    targetUrl.searchParams.set('store_url', profile.store_url || '');

    // Open target in new tab
    window.open(targetUrl.toString(), '_blank');
  };

  const handleUpgradeMock = () => {
    setProfile((prev) => ({
      ...prev,
      plan: 'pro',
      daily_usage_left: 9999,
      max_daily_usage: 9999
    }));
    setIsUpgradeOpen(false);
    alert('🎉 恭喜！您已成功升級至 AMZ Leads Radar Pro 專業版，解鎖無限線索監控與自動填入！');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        profile={profile}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 mb-6 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>今日即時數據已同步 • 5 篇高潛力站外商機</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              從 Reddit 痛點差評，精準攔截屬於您的 Amazon 購買客戶
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              系統全天候監控社群尋求推薦與競品負評。點擊任一商機即可**一鍵跳轉至 Reddit**，並透過 Chrome 外掛在側邊欄秒速微調語氣、一鍵填入留言！
            </p>
          </div>

          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-12 top-6 opacity-10 hidden lg:block pointer-events-none">
            <Radar className="w-32 h-32 text-indigo-400" />
          </div>
        </div>

        {/* Stats Metrics */}
        <StatsBar leads={leads} />

        {/* Filter Controls */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          selectedSubreddit={selectedSubreddit}
          onSubredditChange={setSelectedSubreddit}
          subreddits={subreddits}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          minScore={minScore}
          onMinScoreChange={setMinScore}
        />

        {/* Leads Grid */}
        {filteredLeads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onOpenDetail={setSelectedLead}
                onJumpToReddit={handleJumpToReddit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center my-8">
            <Inbox className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">找不到符合條件的商機線索</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              請嘗試放寬關鍵字搜尋、調整 Subreddit 篩選或重設匹配度門檻。
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSubreddit('all');
                setSelectedStatus('all');
                setMinScore(0);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
            >
              重設所有篩選
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AMZ Leads Radar © 2026 • 跨境電商站外拓客雙軌制 SaaS</span>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600 cursor-not-allowed" title="目前尚未公開">Chrome Web Store 外掛（即將推出）</span>
            <span className="text-slate-600 cursor-not-allowed" title="文件頁面建置中">API 文檔（建置中）</span>
            <span className="text-slate-600 cursor-not-allowed" title="法律文件建置中">使用條款與隱私權（建置中）</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LeadDetailModal
        lead={selectedLead}
        profile={profile}
        onClose={() => setSelectedLead(null)}
        onJumpToReddit={handleJumpToReddit}
        onStatusChange={handleStatusChange}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgradeMock={handleUpgradeMock}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSaveProfile={(updated) => setProfile((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
}
