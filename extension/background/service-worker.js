/**
 * AMZ Leads Radar - Background Service Worker (Manifest V3)
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('AMZ Leads Radar Extension Installed.');

  // Set default storage values
  chrome.storage.local.set({
    plan: 'free',
    usage_left: 3,
    max_usage: 3
  });
  chrome.storage.sync.get(['locale'], (data) => {
    if (!data.locale) chrome.storage.sync.set({ locale: 'en' });
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'RECORD_REPLY') {
    chrome.storage.local.get(['usage_left', 'plan'], (data) => {
      if (data.plan === 'free' && data.usage_left > 0) {
        chrome.storage.local.set({ usage_left: data.usage_left - 1 }, () => {
          sendResponse({ success: true, remaining: data.usage_left - 1 });
        });
      } else {
        sendResponse({ success: true, remaining: data.usage_left });
      }
    });
    return true; // async response
  }
});
