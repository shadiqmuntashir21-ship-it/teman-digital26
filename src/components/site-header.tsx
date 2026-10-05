import Link from "next/link";

export function SiteHeader({ settings }: { settings:any }) {
  const logoUrl = settings?.brand?.logoUrl as string | undefined;
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand-lockup" aria-label="Teman Digital">
          {logoUrl ? <img src={logoUrl} alt="Teman Digital" className="brand-logo" /> : <span className="brand-word">Teman Digital</span>}
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <Link href="/#produk">Produk</Link>
          <Link href="/jasa">Jasa</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/#cara-kerja">Cara Kerja</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <a className="button button-small" href="/#konsultasi">Konsultasi Gratis</a>
      </div>
    </header>
  );
}
