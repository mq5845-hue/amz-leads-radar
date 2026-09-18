import React, { useState } from 'react';
import { X, Save, Store, Link, ShieldAlert, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  if (!isOpen) return null;

  const [brandName, setBrandName] = useState(profile.brand_name || '');
  const [storeUrl, setStoreUrl] = useState(profile.store_url || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      brand_name: brandName,
      store_url: storeUrl
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">賣家品牌與店鋪設定</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              您的品牌名稱 (Brand Name)
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="例如: ApexGear, CozyHome..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              當 AI 產生回覆草稿時，會自動以此品牌名稱置換 [Your Brand]。
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Amazon 商品超連結或店鋪首頁 URL
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
                placeholder="https://www.amazon.com/dp/B0XXXXXXX"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              （選填）建議使用 Amazon Attribution 連結追蹤站外引流紅利與轉化率！
            </p>
          </div>

          <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-xl p-3.5 flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              <strong>防封號提示：</strong>在 Reddit 回覆時，建議優先以「解決買家痛點」為主。若太過直白貼廣告連結容易被版主（Moderator）刪文，Copilot 會自動引導採取軟性自然植入策略。
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg flex items-center space-x-1.5 shadow-md shadow-indigo-600/30"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>已儲存設定</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>儲存設定</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
