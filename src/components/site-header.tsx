import Link from "next/link";

export function SiteHeader({ settings }: { settings:any }) {
  const logoUrl = settings?.brand?.logoUrl as string | undefined;
  const brandName = settings?.brand?.name || "KARVA";
  const nav = settings?.navigation || {};
  const links = Array.isArray(nav.links) && nav.links.length ? nav.links : [
    {label:"Produk",href:"/#produk"},
    {label:"Jasa",href:"/jasa"},
    {label:"Portfolio",href:"/portfolio"},
    {label:"Cara Kerja",href:"/#cara-kerja"},
    {label:"FAQ",href:"/#faq"},
  ];

  return (
    <header className="site-header">
      {nav.announcementEnabled && nav.announcementText ? (
        <a className="announcement-bar" href={nav.announcementHref || "#"}>
          <span>{nav.announcementText}</span>
          <strong>→</strong>
        </a>
      ) : null}
      <div className="nav-shell">
        <Link href="/" className="brand-lockup" aria-label={brandName}>
          {logoUrl ? <img src={logoUrl} alt={brandName} className="brand-logo" /> : <span className="brand-word">{brandName}</span>}
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {links.map((item:any, i:number)=><Link href={item.href || "#"} key={String(item.label||i)}>{item.label || "Menu"}</Link>)}
        </nav>
        <a className="button button-small" href={nav.ctaHref || "/#konsultasi"}>{nav.ctaLabel || "Konsultasi Gratis"}</a>
      </div>
    </header>
  );
}
