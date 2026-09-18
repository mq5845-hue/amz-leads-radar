/**
 * AMZ Leads Radar - Extension Popup Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const btnOpenDashboard = document.getElementById('btn-open-dashboard');
  const btnUpgrade = document.getElementById('btn-upgrade');
  const quotaCount = document.getElementById('quota-count');
  const progressFill = document.getElementById('progress-fill');
  const planTag = document.getElementById('plan-tag');

  // Load state from chrome.storage if available
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['plan', 'usage_left', 'max_usage'], (res) => {
      if (res.plan === 'pro') {
        planTag.textContent = '👑 Pro 專業方案';
        planTag.style.background = 'rgba(245, 158, 11, 0.2)';
        planTag.style.color = '#fbbf24';
        planTag.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        quotaCount.textContent = '無限次數';
        progressFill.style.width = '100%';
        btnUpgrade.style.display = 'none';
      } else if (res.usage_left !== undefined) {
        const left = res.usage_left;
        const max = res.max_usage || 3;
        quotaCount.textContent = `${left} / ${max} 次`;
        progressFill.style.width = `${(left / max) * 100}%`;
      }
    });
  }

  // Open Web Dashboard in new tab
  btnOpenDashboard.addEventListener('click', () => {
    // Open localhost or deployed dashboard
    const dashboardUrl = 'http://localhost:3000';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: dashboardUrl });
    } else {
      window.open(dashboardUrl, '_blank');
    }
  });

  // Upgrade button
  btnUpgrade.addEventListener('click', () => {
    const upgradeUrl = 'http://localhost:3000#upgrade';
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.create({ url: upgradeUrl });
    } else {
      window.open(upgradeUrl, '_blank');
    }
  });
});
