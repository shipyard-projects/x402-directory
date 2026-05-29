import {
  escapeHtml,
  formatPricing,
  getListingBySlug,
  getVerificationClass,
  getVerificationLabel
} from './listing-utils.js';
import { listings } from './listings.js';

const defaultListing = listings[0];
const params = new URLSearchParams(window.location.search);
const initialSlug = params.get('listing') ?? window.location.hash.replace('#', '') ?? defaultListing.slug;

function renderListingTabs(selectedSlug) {
  return listings
    .map((listing) => {
      const activeClass = listing.slug === selectedSlug ? ' listing-tab--active' : '';
      return `
        <button class="listing-tab${activeClass}" type="button" data-listing-slug="${escapeHtml(listing.slug)}">
          <span>${escapeHtml(listing.name)}</span>
          <small>${escapeHtml(listing.category)}</small>
        </button>
      `;
    })
    .join('');
}

function renderListingDetail(slug) {
  const listing = getListingBySlug(listings, slug) ?? defaultListing;
  const app = document.querySelector('#app');

  app.innerHTML = `
    <header class="hero">
      <img class="thumbnail" src="./public/thumbnail.svg" alt="x402 Directory thumbnail" />
      <div>
        <p class="eyebrow">x402 Directory</p>
        <h1>Endpoint detail pages for pay-per-request services.</h1>
        <p class="hero-copy">
          Each listing exposes the endpoint URL, category, pricing, verification state, last checked date,
          and a direct link to try the service.
        </p>
      </div>
    </header>

    <nav class="listing-tabs" aria-label="x402 listings">
      ${renderListingTabs(listing.slug)}
    </nav>

    <main class="detail-grid">
      <section class="detail-card">
        <div class="detail-heading">
          <div>
            <p class="eyebrow">${escapeHtml(listing.category)}</p>
            <h2>${escapeHtml(listing.name)}</h2>
            <p>${escapeHtml(listing.description)}</p>
          </div>
          <span class="${getVerificationClass(listing)}">${escapeHtml(getVerificationLabel(listing))}</span>
        </div>

        <dl class="metadata-grid">
          <div>
            <dt>Endpoint URL</dt>
            <dd><a href="${escapeHtml(listing.url)}">${escapeHtml(listing.url)}</a></dd>
          </div>
          <div>
            <dt>Pricing</dt>
            <dd>${escapeHtml(formatPricing(listing))}</dd>
          </div>
          <div>
            <dt>Last checked</dt>
            <dd><time datetime="${escapeHtml(listing.lastChecked)}">${escapeHtml(listing.lastChecked)}</time></dd>
          </div>
          <div>
            <dt>Maintainer</dt>
            <dd>${escapeHtml(listing.maintainer)}</dd>
          </div>
        </dl>

        <a class="try-link" href="${escapeHtml(listing.tryUrl)}">Try this endpoint</a>
      </section>

      <aside class="summary-card">
        <h3>Detail page coverage</h3>
        <ul>
          <li>Name and description</li>
          <li>URL and try link</li>
          <li>Category and pricing</li>
          <li>Verification status</li>
          <li>Last checked date</li>
        </ul>
      </aside>
    </main>
  `;

  window.history.replaceState({}, '', `?listing=${encodeURIComponent(listing.slug)}`);

  document.querySelectorAll('[data-listing-slug]').forEach((button) => {
    button.addEventListener('click', () => renderListingDetail(button.dataset.listingSlug));
  });
}

renderListingDetail(initialSlug);
