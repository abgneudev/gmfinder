import Link from "next/link";

/**
 * Global site nav. Single source of truth for top-level links — when a new
 * feature lands (quiz, events, faq…), add one entry here and nowhere else.
 * Keep only routes that actually exist so the deployed site has no dead links.
 */
const NAV: { href: string; label: string }[] = [
  { href: "/gms", label: "Browse GMs" },
  { href: "/quiz", label: "Find my game" },
  { href: "/events", label: "Events" },
  // Uncomment as each feature merges:
  // { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-bg/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-text"
        >
          GMFinder <span aria-hidden>🎲</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-text-muted transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
