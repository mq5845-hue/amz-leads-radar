const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class FakeElement {
  constructor(tagName, text = '') { this.tagName = tagName; this.textContent = text; this.children = []; this.attributes = {}; this.isContentEditable = false; }
  querySelector() { return null; }
  getAttribute(name) { return this.attributes[name] || null; }
  focus() { this.focused = true; }
  dispatchEvent(event) { this.lastEvent = event; }
}

class FakeEvent { constructor(type, init = {}) { this.type = type; Object.assign(this, init); } }
const context = { console, Event: FakeEvent, InputEvent: FakeEvent, HTMLTextAreaElement: FakeElement };
vm.runInNewContext(fs.readFileSync(__dirname + '/amazon-review-adapter.js', 'utf8'), context);
const adapter = context.AmzAmazonReviewAdapter;

const textarea = new FakeElement('TEXTAREA');
textarea.value = '';
const review = new FakeElement('DIV');
review.id = 'customer_review-r1';
review.querySelector = (selector) => selector.includes('review-star') ? new FakeElement('SPAN', '2.0 out of 5 stars') : selector.includes('review-body') ? new FakeElement('SPAN', 'The zipper broke after one week.') : selector === 'textarea, [contenteditable="true"], [aria-label*="reply" i]' ? textarea : null;
const doc = { querySelector: () => new FakeElement('DIV'), querySelectorAll: () => [review] };

const reviews = adapter.scanReviews(doc);
assert.equal(reviews.length, 1);
assert.equal(reviews[0].stars, 2);
assert.equal(reviews[0].text, 'The zipper broke after one week.');
const filled = adapter.fillReply(textarea, 'We are sorry to hear this.');
assert.equal(filled.ok, true);
assert.equal(filled.reason, 'filled');
assert.equal(textarea.value, 'We are sorry to hear this.');
const missing = adapter.fillReply(null, 'draft');
assert.equal(missing.ok, false);
assert.equal(missing.reason, 'reply-input-not-found');
console.log('amazon-review-adapter: PASS');
