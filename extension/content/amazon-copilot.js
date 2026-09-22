(function () {
  'use strict';
  const start = () => {
  const t = window.AmzContentI18n?.t || ((key) => key);
  if (document.getElementById('amz-review-copilot-root') || !window.AmzAmazonReviewAdapter) return;
  const reviews = window.AmzAmazonReviewAdapter.scanReviews(document);
  if (!reviews.length) return;

  const root = document.createElement('aside');
  root.id = 'amz-review-copilot-root';
  root.innerHTML = `<div class="amz-review-header"><strong>${t('title')}</strong><button id="amz-review-close" type="button">×</button></div><div class="amz-review-body"><label>${t('review')}<select id="amz-review-select"></select></label><label>${t('instruction')}<textarea id="amz-review-instruction" placeholder="${t('placeholder')}"></textarea></label><button id="amz-review-generate" type="button">${t('generate')}</button><p id="amz-review-status" role="status"></p><label>${t('draft')}<textarea id="amz-review-draft" readonly></textarea></label><div class="amz-review-actions"><button id="amz-review-fill" type="button" disabled>${t('fill')}</button><button id="amz-review-copy" type="button" disabled>${t('copy')}</button></div></div>`;
  document.body.appendChild(root);
  const select = root.querySelector('#amz-review-select');
  const draft = root.querySelector('#amz-review-draft');
  const status = root.querySelector('#amz-review-status');
  reviews.forEach((review, index) => { const option = document.createElement('option'); option.value = index; option.textContent = `${review.stars} stars — ${review.text.slice(0, 48)}`; select.appendChild(option); });
  let generated = null;
  const setStatus = (message) => { status.textContent = message; };
  const current = () => reviews[Number(select.value)];
  root.querySelector('#amz-review-close').onclick = () => root.remove();
  root.querySelector('#amz-review-generate').onclick = async () => {
    const review = current();
    setStatus(t('generating'));
    try {
      const response = await fetch('http://localhost:8787/api/review-drafts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ asin: review.asin, stars: review.stars, reviewText: review.text, extraInstruction: root.querySelector('#amz-review-instruction').value || null, requestId: crypto.randomUUID() }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error?.code || payload.error || `API_${response.status}`);
      generated = payload;
      draft.value = generated.draft || '';
      root.querySelector('#amz-review-fill').disabled = !draft.value;
      root.querySelector('#amz-review-copy').disabled = !draft.value;
      setStatus(generated.warnings?.length ? `Review warnings: ${generated.warnings.join(', ')}` : t('ready'));
    } catch (error) { generated = null; setStatus(`Unable to generate draft (${error.message}).`); }
  };
  root.querySelector('#amz-review-fill').onclick = () => {
    const result = window.AmzAmazonReviewAdapter.fillReply(current().replyInput, draft.value);
    setStatus(result.ok ? t('manual') : t('missing'));
  };
  root.querySelector('#amz-review-copy').onclick = async () => { await navigator.clipboard.writeText(draft.value); setStatus('Draft copied to clipboard.'); };
  };
  if (window.AmzContentI18n) start();
  else window.addEventListener('amz-content-i18n-ready', start, { once: true });
})();
