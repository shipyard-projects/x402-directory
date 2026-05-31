import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "x402 Directory",
  description: "A directory for x402 payment-enabled endpoints",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="topbar">
            <div className="topbar-inner">
              <Link className="brand" href="/">
                <span className="brand-mark">x4</span>
                <span>x402 Directory</span>
              </Link>
              <nav className="nav" aria-label="Primary navigation">
                <Link href="/">Browse</Link>
                <Link href="/submit">Submit</Link>
              </nav>
            </div>
          </header>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  )
}
