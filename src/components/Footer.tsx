import Link from "next/link";

/**
 * Global footer. Legal/info links are added here as those pages merge
 * (privacy, terms, faq) — keep only live routes to avoid dead links.
 */
const LINKS: { href: string; label: string }[] = [
  // { href: "/faq", label: "FAQ" },
  // { href: "/privacy", label: "Privacy" },
  // { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-text-faint sm:flex-row">
        <p>
          <span className="font-semibold text-text">GMFinder</span> — book
          professional Game Masters for tabletop RPGs.
        </p>
        <div className="flex items-center gap-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-accent">
              {l.label}
            </Link>
          ))}
          <span>© 2026 GMFinder</span>
        </div>
      </div>
    </footer>
  );
}
