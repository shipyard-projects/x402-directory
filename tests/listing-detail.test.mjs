import assert from 'node:assert/strict';
import test from 'node:test';
import { getListingBySlug, formatPricing, getVerificationLabel } from '../src/listing-utils.js';

const listings = [
  {
    slug: 'weather-meter',
    name: 'Weather Meter',
    pricing: { amount: 0.02, currency: 'USDC', unit: 'request' },
    verificationStatus: 'verified'
  }
];

test('finds a listing detail record by slug', () => {
  assert.equal(getListingBySlug(listings, 'weather-meter')?.name, 'Weather Meter');
  assert.equal(getListingBySlug(listings, 'missing'), null);
});

test('formats x402 endpoint pricing for the detail page', () => {
  assert.equal(formatPricing(listings[0]), '0.02 USDC / request');
});

test('renders a human verification label', () => {
  assert.equal(getVerificationLabel({ verificationStatus: 'verified' }), 'Verified x402 endpoint');
  assert.equal(getVerificationLabel({ verificationStatus: 'pending' }), 'Verification pending');
});
