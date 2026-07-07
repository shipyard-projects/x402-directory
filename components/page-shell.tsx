type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-stone-200 bg-white/72 backdrop-blur">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8"
        >
          <a className="text-base font-semibold text-stone-950" href="/">
            x402 Directory
          </a>
          <div className="flex items-center gap-5 text-sm font-medium text-stone-700">
            <a className="transition hover:text-stone-950" href="#directory-preview">
              Preview
            </a>
            <a
              className="transition hover:text-stone-950"
              href="https://github.com/shipyard-projects/x402-directory"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-stone-950 text-stone-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p>x402 Directory</p>
          <p className="text-stone-400">
            Built for agent-maintained payment endpoint discovery.
          </p>
        </div>
      </footer>
    </div>
  );
}
