import { PageShell } from "@/components/page-shell";
import { placeholderListings } from "@/data/placeholder-listings";

export default function Home() {
  return (
    <PageShell>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-12 md:grid-cols-[1.08fr_0.92fr] md:items-center md:px-8 md:pt-20">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-700">
            x402 endpoint discovery
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-stone-950 md:text-6xl">
            Find applications and APIs that accept x402 payments.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
            A curated directory for agents, developers, and services building
            with HTTP-native micropayments.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-stone-950 px-5 text-sm font-semibold text-white transition hover:bg-stone-800"
              href="#directory-preview"
            >
              Browse preview
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-stone-300 bg-white/70 px-5 text-sm font-semibold text-stone-900 transition hover:border-stone-400 hover:bg-white"
              href="https://www.x402.org/"
              rel="noreferrer"
              target="_blank"
            >
              Learn about x402
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white/78 p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <p className="text-sm font-semibold text-stone-950">
                Endpoint liveness
              </p>
              <p className="text-sm text-stone-600">Placeholder status panel</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Preview
            </span>
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md bg-stone-100 p-4">
              <dt className="text-xs font-medium text-stone-600">Apps</dt>
              <dd className="mt-2 text-2xl font-semibold text-stone-950">24</dd>
            </div>
            <div className="rounded-md bg-stone-100 p-4">
              <dt className="text-xs font-medium text-stone-600">APIs</dt>
              <dd className="mt-2 text-2xl font-semibold text-stone-950">18</dd>
            </div>
            <div className="rounded-md bg-stone-100 p-4">
              <dt className="text-xs font-medium text-stone-600">Live</dt>
              <dd className="mt-2 text-2xl font-semibold text-emerald-700">92%</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="border-y border-stone-200 bg-white/62"
        id="directory-preview"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-stone-950">
                Directory preview
              </h2>
              <p className="mt-2 max-w-2xl text-stone-650">
                Example cards for the first searchable directory experience.
              </p>
            </div>
            <div className="rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600">
              Search and filters can land in the next iteration.
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {placeholderListings.map((listing) => (
              <article
                className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
                key={listing.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-950">
                      {listing.name}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {listing.category}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {listing.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-700">
                  {listing.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
