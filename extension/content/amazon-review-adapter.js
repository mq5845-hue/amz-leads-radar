(function (root) {
  'use strict';

  const reviewSelectors = '[data-hook="review"], .review, [id^="customer_review-"]';

  function textOf(node, selectors) {
    for (const selector of selectors) {
      const found = node.querySelector(selector);
      if (found && found.textContent.trim()) return found.textContent.trim();
    }
    return '';
  }

  function starsFrom(node) {
    const value = textOf(node, ['[data-hook="review-star-rating"]', '[data-hook="cmps-review-star-rating"]', '.a-icon-alt']);
    const match = value.match(/([1-5](?:\.\d)?)\s+out of 5/i);
    return match ? Number(match[1]) : 0;
  }

  function scanReviews(doc) {
    return Array.from(doc.querySelectorAll(reviewSelectors)).map((review, index) => ({
      reviewId: review.id || review.getAttribute('data-review-id') || `review-${index + 1}`,
      asin: doc.querySelector('[data-asin]')?.getAttribute('data-asin') || null,
      stars: starsFrom(review),
      text: textOf(review, ['[data-hook="review-body"]', '.review-text', '[data-hook="review-collapsed"]']),
      replyInput: review.querySelector('textarea, [contenteditable="true"], [aria-label*="reply" i]')
    })).filter((review) => review.stars >= 1 && review.stars <= 3 && review.text);
  }

  function fillReply(input, draft) {
    if (!input || !draft) return { ok: false, reason: 'reply-input-not-found' };
    input.focus();
    if (input instanceof root.HTMLTextAreaElement || input.tagName?.toLowerCase() === 'textarea') {
      input.value = draft;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (input.isContentEditable || input.getAttribute('contenteditable') === 'true') {
      input.textContent = draft;
      input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: draft }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      return { ok: false, reason: 'unsupported-reply-input' };
    }
    return { ok: true, reason: 'filled' };
  }

  root.AmzAmazonReviewAdapter = { scanReviews, fillReply };
})(typeof window === 'undefined' ? globalThis : window);
