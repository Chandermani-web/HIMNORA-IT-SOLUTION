import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  calculateReadTime,
  formatStatValue,
  slugToTitle,
} from './agencyHelpers';

test('validateContactForm catches empty and invalid inputs', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    budget: '',
    service: '',
    message: '',
  });

  assert.ok(emptyResult.name, 'name error should exist');
  assert.ok(emptyResult.email, 'email error should exist');
  assert.ok(emptyResult.budget, 'budget error should exist');
  assert.ok(emptyResult.service, 'service error should exist');
  assert.ok(emptyResult.message, 'message error should exist');
});

test('validateContactForm passes for valid input values', () => {
  const validResult = validateContactForm({
    name: 'Alexandra Vance',
    email: 'alex@enterprise.com',
    budget: 'Rs. 1,00,000 - 3,00,000',
    service: 'Website Development',
    message: 'We require a bespoke enterprise React platform with technical SEO.',
  });

  assert.deepEqual(validResult, {}, 'Should have zero validation errors');
});

test('calculateReadTime computes accurate reading duration', () => {
  const shortText = ['Hello world test.'];
  assert.equal(calculateReadTime(shortText), 1);

  const longParagraph = new Array(450).fill('word').join(' ');
  assert.equal(calculateReadTime([longParagraph]), 3);
});

test('formatStatValue formats stats accurately', () => {
  assert.equal(formatStatValue(180, 'count'), '180+');
  assert.equal(formatStatValue(98.4, 'percent'), '98.4%');
  assert.equal(formatStatValue(4.9, 'rating'), '4.9/5');
});

test('slugToTitle formats kebab-case into Title Case', () => {
  assert.equal(slugToTitle('website-development'), 'Website Development');
  assert.equal(slugToTitle('aurora-luxury-e-commerce'), 'Aurora Luxury E Commerce');
});
