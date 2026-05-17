import {
  categories,
  getCategory,
  getCategoryCounts,
  getListingsByCategory,
  listings
} from "./catalog.js";

const app = document.querySelector("#app");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function listingCard(listing) {
  const category = getCategory(listing.category);
  const status = listing.verified ? "Verified" : "Needs check";

  return `
    <article class="listing-card">
      <div>
        <p class="eyebrow">${escapeHtml(category?.name ?? "Uncategorized")}</p>
        <h3>${escapeHtml(listing.name)}</h3>
        <p>${escapeHtml(listing.description)}</p>
      </div>
      <dl>
        <div>
          <dt>Pricing</dt>
          <dd>${escapeHtml(listing.pricing)}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>${status}</dd>
        </div>
        <div>
          <dt>Last checked</dt>
          <dd>${escapeHtml(listing.lastChecked)}</dd>
        </div>
      </dl>
      <a class="button" href="${escapeHtml(listing.url)}" rel="noreferrer">Try endpoint</a>
    </article>
  `;
}

function categoryCard(category) {
  return `
    <a class="category-card" href="#/categories/${category.slug}">
      <span>${category.count} listing${category.count === 1 ? "" : "s"}</span>
      <h3>${escapeHtml(category.name)}</h3>
      <p>${escapeHtml(category.description)}</p>
    </a>
  `;
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Agent-maintained x402 services</p>
      <h1>Discover payment-enabled endpoints by category.</h1>
      <p>
        Browse an initial taxonomy for x402 services and jump into filtered
        category pages for AI, data, compute, storage, content, developer tools,
        and identity services.
      </p>
      <div class="actions">
        <a class="button primary" href="#/categories">Browse categories</a>
        <a class="button" href="#/listings">View all listings</a>
      </div>
    </section>
    <section>
      <div class="section-heading">
        <h2>Categories</h2>
        <p>${categories.length} categories covering ${listings.length} starter listings.</p>
      </div>
      <div class="category-grid">
        ${getCategoryCounts().map(categoryCard).join("")}
      </div>
    </section>
  `;
}

function renderCategories() {
  app.innerHTML = `
    <section>
      <div class="section-heading">
        <p class="eyebrow">Taxonomy</p>
        <h1>Browse by category</h1>
        <p>Each category page filters the directory to matching x402 services.</p>
      </div>
      <div class="category-grid">
        ${getCategoryCounts().map(categoryCard).join("")}
      </div>
    </section>
  `;
}

function renderCategory(slug) {
  const category = getCategory(slug);

  if (!category) {
    renderNotFound();
    return;
  }

  const categoryListings = getListingsByCategory(slug);

  app.innerHTML = `
    <section>
      <a class="back-link" href="#/categories">Back to categories</a>
      <div class="section-heading">
        <p class="eyebrow">${categoryListings.length} listing${categoryListings.length === 1 ? "" : "s"}</p>
        <h1>${escapeHtml(category.name)}</h1>
        <p>${escapeHtml(category.description)}</p>
      </div>
      <div class="listing-grid">
        ${categoryListings.length ? categoryListings.map(listingCard).join("") : "<p>No listings yet.</p>"}
      </div>
    </section>
  `;
}

function renderListings() {
  app.innerHTML = `
    <section>
      <div class="section-heading">
        <p class="eyebrow">${listings.length} starter listings</p>
        <h1>All x402 listings</h1>
        <p>Use category labels to understand where each endpoint fits.</p>
      </div>
      <div class="listing-grid">
        ${listings.map(listingCard).join("")}
      </div>
    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">404</p>
      <h1>Category not found.</h1>
      <p>The requested category does not exist in the current taxonomy.</p>
      <a class="button primary" href="#/categories">Browse categories</a>
    </section>
  `;
}

function route() {
  const hash = window.location.hash || "#/";
  const [, section, slug] = hash.split("/");

  if (!section) {
    renderHome();
  } else if (section === "categories" && slug) {
    renderCategory(slug);
  } else if (section === "categories") {
    renderCategories();
  } else if (section === "listings") {
    renderListings();
  } else {
    renderNotFound();
  }

  app.focus({ preventScroll: true });
}

window.addEventListener("hashchange", route);
route();
