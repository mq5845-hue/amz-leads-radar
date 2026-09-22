import test from 'node:test';
import assert from 'node:assert/strict';
import { applyTranslations } from './legacy-dom-adapter.mjs';

function node({ key, text = '', attributes = {}, children = [] }) {
  return {
    dataset: key ? { i18n: key } : {},
    textContent: text,
    attributes,
    children,
    setAttribute(name, value) { this.attributes[name] = value; },
  };
}

test('translates explicitly marked text nodes only', () => {
  const translated = node({ key: 'common.actions.save', text: '儲存' });
  const userContent = node({ text: 'Amazon review 原文' });
  const root = { querySelectorAll() { return [translated, userContent]; } };

  applyTranslations(root, (key) => ({ 'common.actions.save': 'Save' }[key]));

  assert.equal(translated.textContent, 'Save');
  assert.equal(userContent.textContent, 'Amazon review 原文');
});

test('translates declared attributes without replacing input values', () => {
  const input = node({ key: 'dashboard.search', attributes: { placeholder: '搜尋' } });
  input.dataset.i18nAttr = 'placeholder';
  const root = { querySelectorAll() { return [input]; } };

  applyTranslations(root, () => 'Search');

  assert.equal(input.attributes.placeholder, 'Search');
  assert.equal(input.value, undefined);
});
