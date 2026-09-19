import React from 'react';
import { X, Check, Crown, Shield, Sparkles } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgradeMock: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onUpgradeMock
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 text-center border-b border-slate-800 relative bg-gradient-to-b from-indigo-950/40 to-slate-900">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-3 shadow-lg shadow-amber-500/10">
            <Crown className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">升級 AMZ Leads Radar Pro 專業版</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
            為跨境賣家解鎖全天候無上限社群商機監控、高轉化 AI 話術與 Chrome 一鍵填入輔助！
          </p>
        </div>

        {/* Pricing Comparison Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Free Tier Card */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-200 text-sm">Free 體驗方案</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-semibold">當前方案</span>
              </div>
              <div className="text-2xl font-bold text-white mb-4">$0 <span className="text-xs text-slate-500 font-normal">/ 永久免費</span></div>
              <ul className="space-y-2.5 text-xs text-slate-400 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>每日最新 5 條商機線索</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>每日 3 次外掛一鍵填入輔助</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>預設社群品類監控</span>
                </li>
              </ul>
            </div>
            <button
              disabled
              className="w-full py-2 rounded-lg bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed"
            >
              已在使用中
            </button>
          </div>

          {/* Pro Tier Card */}
          <div className="bg-gradient-to-b from-indigo-900/30 to-slate-800/80 border-2 border-indigo-500 rounded-xl p-5 flex flex-col justify-between relative shadow-xl shadow-indigo-500/10">
            <div className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
              最受歡迎
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-indigo-300 text-sm">Pro 專業方案</h3>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white mb-4">
                $29 <span className="text-xs text-slate-400 font-normal">/ 月 (隨時可取消)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong className="text-white">無上限</strong> 線索全天候即時監控</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span><strong className="text-white">無上限</strong> Chrome 外掛輔助自動填入</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>3 種專業話術語氣 + 自訂 Prompt</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>支援自訂 15 組品類與競品關鍵字庫</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Telegram / Discord 實時商機通報</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onUpgradeMock}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              立即開通 Pro 專業版 (串接 Stripe)
            </button>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>7 天無條件全額退款保證 • SSL 256 位元加密安全付款</span>
        </div>
      </div>
    </div>
  );
};
