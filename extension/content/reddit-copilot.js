/**
 * AMZ Leads Radar - Reddit Copilot Content Script
 * 
 * Injects a floating AI Copilot on Reddit post pages,
 * providing pain point analysis, tone fine-tuning, and 1-click comment autofill.
 */

(function () {
  'use strict';

  // Avoid duplicate injection
  if (document.getElementById('amz-radar-copilot-root')) return;

  // Extract URL parameters if launched from AMZ Leads Radar Dashboard
  const urlParams = new URLSearchParams(window.location.search);
  const leadId = urlParams.get('amz_radar_lead_id');
  const paramBrand = urlParams.get('brand') || '';
  const paramStoreUrl = urlParams.get('store_url') || '';

  // Preset smart drafts if matching or analyzing
  const SAMPLE_ANALYSIS = {
    title: document.querySelector('h1')?.innerText?.trim() || 'Reddit 產品討論貼文',
    painpoint: '發文者對於現有市售產品之耐用度或規格感到不滿，急尋解決痛點的高性價比替代品。',
    replies: {
      helpful: "Totally understand the frustration with this issue. The root cause usually comes down to heat dissipation and budget components cutting corners. If you're looking for an alternative that actually holds up, check out [Your Brand / Link]—they use reinforced alloy materials and grade-A components specifically built to prevent this failure.",
      empathetic: "Man, I had the exact same nightmare experience a few months ago! It drove me crazy until a colleague recommended [Your Brand / Link]. I've been using it daily for about 8 months now and haven't had a single issue since.",
      tech: "From an engineering standpoint, this failure happens due to thermal fatigue and low-cycle fatigue on the connectors. You'll want to prioritize products with CNC aluminum housings and dual NTC thermal sensors. [Your Brand / Link] is one of the few that meets these exact industrial specs."
    }
  };

  // State
  let state = {
    minimized: false,
    activeTone: 'helpful',
    brandName: paramBrand || 'ApexGear',
    storeUrl: paramStoreUrl || '',
    draftText: '',
    toastMessage: ''
  };

  function updateDraftText() {
    let raw = SAMPLE_ANALYSIS.replies[state.activeTone];
    const linkText = state.storeUrl 
      ? `[${state.brandName || 'Brand'}](${state.storeUrl})`
      : `[${state.brandName || 'Brand'}]`;
    state.draftText = raw.replace(/\[Your Brand \/ Link\]/g, linkText);
  }

  updateDraftText();

  // Create UI DOM
  const root = document.createElement('div');
  root.id = 'amz-radar-copilot-root';
  document.body.appendChild(root);

  function render() {
    if (state.minimized) {
      root.className = 'amz-minimized';
      root.title = '點擊展開 AMZ Leads Radar Copilot';
      root.innerHTML = `
        <div class="amz-header">
          <span style="font-size: 22px;">⚡</span>
        </div>
      `;
      root.onclick = (e) => {
        state.minimized = false;
        render();
      };
      return;
    }

    root.onclick = null;
    root.className = '';

    root.innerHTML = `
      <div class="amz-header">
        <div class="amz-header-left">
          <div class="amz-logo-badge">🎯</div>
          <div class="amz-header-text">
            <span class="amz-title">AMZ Leads Radar</span>
            <span class="amz-badge">Copilot</span>
          </div>
        </div>
        <div class="amz-actions">
          <button class="amz-icon-btn" id="amz-btn-minimize" title="最小化">─</button>
          <button class="amz-icon-btn" id="amz-btn-close" title="關閉外掛">✕</button>
        </div>
      </div>

      <div class="amz-body">
        <!-- Pain point insight -->
        <div class="amz-painpoint-box">
          <div class="amz-section-title">
            <span>🚨</span>
            <span>Gemini 痛點診斷：</span>
          </div>
          <div class="amz-painpoint-text">
            ${SAMPLE_ANALYSIS.painpoint}
          </div>
        </div>

        <!-- Tone selector -->
        <div>
          <span class="amz-tone-label">AI 回覆風格切換：</span>
          <div class="amz-tone-tabs">
            <button class="amz-tone-tab ${state.activeTone === 'helpful' ? 'active' : ''}" data-tone="helpful">
              💡 客觀科普
            </button>
            <button class="amz-tone-tab ${state.activeTone === 'empathetic' ? 'active' : ''}" data-tone="empathetic">
              🤝 買家共鳴
            </button>
            <button class="amz-tone-tab ${state.activeTone === 'tech' ? 'active' : ''}" data-tone="tech">
              🛠 專業專家
            </button>
          </div>
        </div>

        <!-- Brand / Store Link Inputs -->
        <div>
          <span class="amz-tone-label">品牌與推廣連結：</span>
          <div class="amz-variables-row">
            <input type="text" class="amz-input" id="amz-brand-input" placeholder="品牌 (如: ApexGear)" value="${state.brandName}" />
            <input type="text" class="amz-input" id="amz-url-input" placeholder="店鋪 / 商品 URL" value="${state.storeUrl}" />
          </div>
        </div>

        <!-- Editable Draft -->
        <div>
          <span class="amz-tone-label">預擬美式英文文案：</span>
          <textarea class="amz-draft-textarea" id="amz-draft-text" rows="4">${state.draftText}</textarea>
        </div>

        <!-- Autofill Action -->
        <button class="amz-btn-fill" id="amz-btn-autofill">
          <span>✨ 一鍵填入 Reddit 評論框</span>
        </button>

        ${state.toastMessage ? `
          <div class="amz-toast">
            <span>${state.toastMessage}</span>
          </div>
        ` : ''}
      </div>

      <div class="amz-footer">
        <span style="font-size: 10px; color: #64748b;">真人審核 • 100% 防封號機制</span>
        <button class="amz-btn-mark" id="amz-btn-mark-replied">標記為已回覆</button>
      </div>
    `;

    attachEventListeners();
  }

  function attachEventListeners() {
    // Minimize / Close
    document.getElementById('amz-btn-minimize')?.addEventListener('click', () => {
      state.minimized = true;
      render();
    });

    document.getElementById('amz-btn-close')?.addEventListener('click', () => {
      root.remove();
    });

    // Tone Tabs
    document.querySelectorAll('.amz-tone-tab').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        state.activeTone = btn.getAttribute('data-tone');
        updateDraftText();
        render();
      });
    });

    // Inputs
    document.getElementById('amz-brand-input')?.addEventListener('input', (e) => {
      state.brandName = e.target.value;
      updateDraftText();
      const textarea = document.getElementById('amz-draft-text');
      if (textarea) textarea.value = state.draftText;
    });

    document.getElementById('amz-url-input')?.addEventListener('input', (e) => {
      state.storeUrl = e.target.value;
      updateDraftText();
      const textarea = document.getElementById('amz-draft-text');
      if (textarea) textarea.value = state.draftText;
    });

    document.getElementById('amz-draft-text')?.addEventListener('input', (e) => {
      state.draftText = e.target.value;
    });

    // Autofill into Reddit's Comment Box
    document.getElementById('amz-btn-autofill')?.addEventListener('click', handleAutofill);

    // Mark as replied
    document.getElementById('amz-btn-mark-replied')?.addEventListener('click', () => {
      showToast('🎉 已將此貼文標記為「已回覆」！');
    });
  }

  function showToast(msg) {
    state.toastMessage = msg;
    render();
    setTimeout(() => {
      state.toastMessage = '';
      render();
    }, 4000);
  }

  /**
   * Smartly locate Reddit's comment composer across different Reddit versions (Shreddit, Redesign, Old)
   */
  function handleAutofill() {
    const textToFill = state.draftText;

    // 1. Try finding modern Shreddit or standard contenteditable div
    let editor = document.querySelector('div[contenteditable="true"]');

    // 2. If not found, try to find and click "Add a comment" button or composer placeholder
    if (!editor) {
      const placeholderTrigger = document.querySelector('shreddit-comment-composer, [placeholder*="comment"], [aria-label*="comment"]');
      if (placeholderTrigger) {
        placeholderTrigger.click();
      }
      editor = document.querySelector('div[contenteditable="true"]');
    }

    // 3. Try standard textarea fallback
    if (!editor) {
      editor = document.querySelector('textarea[name="text"], textarea[placeholder*="comment"], textarea');
    }

    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      editor.focus();

      if (editor.tagName.toLowerCase() === 'textarea') {
        editor.value = textToFill;
        editor.dispatchEvent(new Event('input', { bubbles: true }));
        editor.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        // ContentEditable (Rich Text on modern Reddit)
        // Execute insertText command for native undo stack & event bubbling
        const successful = document.execCommand('insertText', false, textToFill);
        if (!successful) {
          editor.innerText = textToFill;
        }
        editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: textToFill }));
        editor.dispatchEvent(new Event('change', { bubbles: true }));
      }

      showToast('✅ 成功填入評論輸入框！請手動點擊 Comment 發布。');
    } else {
      // Fallback: Copy to clipboard and notify user
      navigator.clipboard.writeText(textToFill);
      showToast('📋 已複製回覆文案至剪貼簿！請點擊貼文下方「Reply」貼上。');
    }
  }

  // Initial render
  render();
})();
