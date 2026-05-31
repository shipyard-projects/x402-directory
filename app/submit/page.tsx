"use client"

import { FormEvent, useMemo, useState } from "react"

type ListingForm = {
  name: string
  url: string
  description: string
  category: string
  pricing: string
}

type ListingErrors = Partial<Record<keyof ListingForm, string>>

const categories = [
  "AI agent service",
  "Data API",
  "Developer tool",
  "Media generation",
  "Payments",
  "Research",
  "Other",
]

const initialForm: ListingForm = {
  name: "",
  url: "",
  description: "",
  category: "",
  pricing: "",
}

function validateUrl(value: string) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}

function validate(form: ListingForm): ListingErrors {
  const errors: ListingErrors = {}

  if (form.name.trim().length < 3) {
    errors.name = "Use a clear listing name with at least 3 characters."
  }

  if (!validateUrl(form.url.trim())) {
    errors.url = "Enter a valid http or https endpoint URL."
  }

  if (form.description.trim().length < 24) {
    errors.description =
      "Describe what the endpoint does in at least 24 characters."
  }

  if (!form.category) {
    errors.category = "Choose the closest endpoint category."
  }

  if (form.pricing.trim().length < 3) {
    errors.pricing = "Add pricing details, for example: 0.01 USDC per call."
  }

  return errors
}

function readStoredListings() {
  try {
    return JSON.parse(
      window.localStorage.getItem("x402-directory-submissions") ?? "[]",
    )
  } catch {
    return []
  }
}

export default function SubmitListingPage() {
  const [form, setForm] = useState<ListingForm>(initialForm)
  const [touched, setTouched] = useState<Partial<Record<keyof ListingForm, boolean>>>({})
  const [submitted, setSubmitted] = useState<ListingForm | null>(null)

  const errors = useMemo(() => validate(form), [form])

  function updateField<K extends keyof ListingForm>(key: K, value: ListingForm[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function visibleError(key: keyof ListingForm) {
    return touched[key] ? errors[key] : undefined
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched({
      name: true,
      url: true,
      description: true,
      category: true,
      pricing: true,
    })

    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const cleanListing = {
      name: form.name.trim(),
      url: form.url.trim(),
      description: form.description.trim(),
      category: form.category,
      pricing: form.pricing.trim(),
    }

    const listings = readStoredListings()
    window.localStorage.setItem(
      "x402-directory-submissions",
      JSON.stringify([cleanListing, ...listings].slice(0, 10)),
    )

    setSubmitted(cleanListing)
  }

  function resetForm() {
    setForm(initialForm)
    setTouched({})
    setSubmitted(null)
  }

  return (
    <div className="workspace">
      <section>
        <h1 className="section-title">Submit an x402 endpoint</h1>
        <p className="section-copy">
          Publish a payment-enabled service with the endpoint URL, category, and
          pricing details needed for review. The form validates required fields
          before accepting a local submission.
        </p>

        <form className="panel form-panel form-grid" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <div className="field">
              <div className="label-row">
                <label htmlFor="name">Name</label>
                <span className="hint">Required</span>
              </div>
              <input
                id="name"
                className="input"
                value={form.name}
                onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                onChange={(event) => updateField("name", event.target.value)}
                aria-invalid={Boolean(visibleError("name"))}
                aria-describedby={visibleError("name") ? "name-error" : undefined}
                placeholder="Agent Weather API"
              />
              {visibleError("name") ? (
                <span className="error" id="name-error">
                  {visibleError("name")}
                </span>
              ) : null}
            </div>

            <div className="field">
              <div className="label-row">
                <label htmlFor="category">Category</label>
                <span className="hint">Required</span>
              </div>
              <select
                id="category"
                className="select"
                value={form.category}
                onBlur={() =>
                  setTouched((current) => ({ ...current, category: true }))
                }
                onChange={(event) => updateField("category", event.target.value)}
                aria-invalid={Boolean(visibleError("category"))}
                aria-describedby={
                  visibleError("category") ? "category-error" : undefined
                }
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {visibleError("category") ? (
                <span className="error" id="category-error">
                  {visibleError("category")}
                </span>
              ) : null}
            </div>
          </div>

          <div className="field">
            <div className="label-row">
              <label htmlFor="url">Endpoint URL</label>
              <span className="hint">http or https</span>
            </div>
            <input
              id="url"
              className="input"
              value={form.url}
              onBlur={() => setTouched((current) => ({ ...current, url: true }))}
              onChange={(event) => updateField("url", event.target.value)}
              aria-invalid={Boolean(visibleError("url"))}
              aria-describedby={visibleError("url") ? "url-error" : undefined}
              placeholder="https://api.example.com/x402/weather"
              inputMode="url"
            />
            {visibleError("url") ? (
              <span className="error" id="url-error">
                {visibleError("url")}
              </span>
            ) : null}
          </div>

          <div className="field">
            <div className="label-row">
              <label htmlFor="description">Description</label>
              <span className="hint">{form.description.length}/500</span>
            </div>
            <textarea
              id="description"
              className="textarea"
              maxLength={500}
              value={form.description}
              onBlur={() =>
                setTouched((current) => ({ ...current, description: true }))
              }
              onChange={(event) => updateField("description", event.target.value)}
              aria-invalid={Boolean(visibleError("description"))}
              aria-describedby={
                visibleError("description") ? "description-error" : undefined
              }
              placeholder="Explain what the endpoint provides, expected inputs, and ideal users."
            />
            {visibleError("description") ? (
              <span className="error" id="description-error">
                {visibleError("description")}
              </span>
            ) : null}
          </div>

          <div className="field">
            <div className="label-row">
              <label htmlFor="pricing">Pricing details</label>
              <span className="hint">Required</span>
            </div>
            <input
              id="pricing"
              className="input"
              value={form.pricing}
              onBlur={() =>
                setTouched((current) => ({ ...current, pricing: true }))
              }
              onChange={(event) => updateField("pricing", event.target.value)}
              aria-invalid={Boolean(visibleError("pricing"))}
              aria-describedby={
                visibleError("pricing") ? "pricing-error" : undefined
              }
              placeholder="0.01 USDC per request"
            />
            {visibleError("pricing") ? (
              <span className="error" id="pricing-error">
                {visibleError("pricing")}
              </span>
            ) : null}
          </div>

          {submitted ? (
            <div className="success" role="status">
              Listing saved locally for review.
            </div>
          ) : null}

          {submitted ? (
            <div className="preview" aria-label="Submitted listing preview">
              <div className="preview-item">
                <span>Name</span>
                <strong>{submitted.name}</strong>
              </div>
              <div className="preview-item">
                <span>URL</span>
                <strong>{submitted.url}</strong>
              </div>
              <div className="preview-item">
                <span>Category</span>
                <strong>{submitted.category}</strong>
              </div>
              <div className="preview-item">
                <span>Pricing</span>
                <strong>{submitted.pricing}</strong>
              </div>
            </div>
          ) : null}

          <div className="actions">
            <button className="button button-secondary" type="button" onClick={resetForm}>
              Reset
            </button>
            <button className="button button-primary" type="submit">
              Submit listing
            </button>
          </div>
        </form>
      </section>

      <aside className="aside" aria-label="Submission guidance">
        <section className="panel aside-card">
          <h2>Required fields</h2>
          <ul>
            <li>Name</li>
            <li>Endpoint URL</li>
            <li>Description</li>
            <li>Category</li>
            <li>Pricing details</li>
          </ul>
        </section>
        <section className="panel aside-card">
          <h3>Validation</h3>
          <p>
            The form checks URL format, required values, and minimum descriptive
            detail before saving a local submission preview.
          </p>
        </section>
      </aside>
    </div>
  )
}
