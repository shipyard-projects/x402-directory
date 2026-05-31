import Link from "next/link"

export default function HomePage() {
  return (
    <section className="empty-state panel">
      <div>
        <h1 className="section-title">x402 endpoint directory</h1>
        <p>
          Add payment-enabled endpoints with enough detail for agents and
          developers to evaluate the service before integrating it.
        </p>
      </div>
      <Link className="link-button" href="/submit">
        Submit listing
      </Link>
    </section>
  )
}
