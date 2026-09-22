import test from 'node:test';
import assert from 'node:assert/strict';
import { resources } from './locale-resources.mjs';
import { SUPPORTED_LOCALES, validateResourceSet } from './locale-contract.mjs';

test('ships a complete resource set for every supported locale', () => {
  assert.deepEqual(Object.keys(resources).sort(), [...SUPPORTED_LOCALES].sort());
  assert.equal(validateResourceSet(resources), true);
});

test('keeps AI drafts and Amazon reviews outside the translated resource contract', () => {
  for (const locale of SUPPORTED_LOCALES) {
    assert.equal(resources[locale].dashboard.aiDraft, undefined);
    assert.equal(resources[locale].dashboard.amazonReview, undefined);
  }
});
