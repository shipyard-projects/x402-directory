export function getListingBySlug(listings, slug) {
  return listings.find((listing) => listing.slug === slug) ?? null;
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function formatPricing(listing) {
  const { amount, currency, unit } = listing.pricing;
  return `${amount.toFixed(2)} ${currency} / ${unit}`;
}

export function getVerificationLabel(listing) {
  switch (listing.verificationStatus) {
    case 'verified':
      return 'Verified x402 endpoint';
    case 'failed':
      return 'Needs recheck';
    default:
      return 'Verification pending';
  }
}

export function getVerificationClass(listing) {
  switch (listing.verificationStatus) {
    case 'verified':
      return 'status-pill status-pill--verified';
    case 'failed':
      return 'status-pill status-pill--failed';
    default:
      return 'status-pill status-pill--pending';
  }
}
