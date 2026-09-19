(function () {
  'use strict';
  if (document.getElementById('amz-review-copilot-root') || !window.AmzAmazonReviewAdapter) return;
  const reviews = window.AmzAmazonReviewAdapter.scanReviews(document);
  if (!reviews.length) return;

  const root = document.createElement('aside');
  root.id = 'amz-review-copilot-root';
  root.innerHTML = '<div class="amz-review-header"><strong>AMZ Review Copilot</strong><button id="amz-review-close" type="button">×</button></div><div class="amz-review-body"><label>評論<select id="amz-review-select"></select></label><label>額外指示<textarea id="amz-review-instruction" placeholder="例如：承認問題並引導聯絡客服"></textarea></label><button id="amz-review-generate" type="button">Generate reply</button><p id="amz-review-status" role="status"></p><label>英文草稿<textarea id="amz-review-draft" readonly></textarea></label><div class="amz-review-actions"><button id="amz-review-fill" type="button" disabled>Fill reply</button><button id="amz-review-copy" type="button" disabled>Copy Draft</button></div></div>';
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
    const requestId = crypto.randomUUID();
    setStatus('Generating…');
    try {
      const response = await fetch('http://localhost:8787/api/review-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asin: review.asin,
          stars: review.stars,
          reviewText: review.text,
          extraInstruction: root.querySelector('#amz-review-instruction').value || null,
          requestId,
          reviewFingerprint: review.reviewId || review.asin || requestId,
        }),
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) throw new Error('Please sign in to AMZ Leads Radar first.');
        throw new Error(`API ${response.status}`);
      }
      generated = await response.json();
      draft.value = generated.draft || '';
      root.querySelector('#amz-review-fill').disabled = !draft.value;
      root.querySelector('#amz-review-copy').disabled = !draft.value;
      setStatus(generated.warnings?.length ? `Review warnings: ${generated.warnings.join(', ')}` : 'Draft ready for review.');
    } catch (error) { generated = null; setStatus(`Unable to generate draft: ${error.message}`); }
  };
  root.querySelector('#amz-review-fill').onclick = () => {
    const result = window.AmzAmazonReviewAdapter.fillReply(current().replyInput, draft.value);
    setStatus(result.ok ? 'Filled. Please review and submit manually in Amazon.' : 'Reply field not detected. Use Copy Draft.');
  };
  root.querySelector('#amz-review-copy').onclick = async () => { await navigator.clipboard.writeText(draft.value); setStatus('Draft copied to clipboard.'); };
})();
