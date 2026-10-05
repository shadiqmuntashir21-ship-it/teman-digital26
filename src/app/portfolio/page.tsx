import { ArrowUpRight } from "lucide-react";
import { getPortfolios, getSettings } from "@/lib/cms";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [items, settings] = await Promise.all([getPortfolios(), getSettings()]);
  return <main>
    <SiteHeader settings={settings}/>
    <section className="page-hero section-dark"><div className="container"><div className="eyebrow light">PORTFOLIO</div><h1>Masalah nyata. Solusi yang benar-benar dipakai.</h1><p className="hero-lead">Kami menampilkan project sebagai studi kasus—bukan sekadar galeri screenshot.</p></div></section>
    <section className="section"><div className="container">
      {items.length ? <div className="portfolio-page-grid">{items.map((p:any)=><article className="portfolio-page-card" key={p.slug}><div className="portfolio-cover">{p.coverUrl?<img src={p.coverUrl} alt={p.title}/>:<div className="portfolio-placeholder"><span>{p.category}</span><strong>{p.title}</strong></div>}</div><div className="portfolio-page-copy"><span>{p.category}</span><h2>{p.title}</h2><p>{p.summary}</p>{p.technologies?.length>0&&<div className="chip-row">{p.technologies.map((x:string)=><span key={x}>{x}</span>)}</div>}<div className="portfolio-actions">{p.previewUrl&&<a className="button" target="_blank" rel="noreferrer" href={p.previewUrl}>Preview Web <ArrowUpRight size={17}/></a>}{p.sourceUrl&&<a className="text-link" target="_blank" rel="noreferrer" href={p.sourceUrl}>Link tambahan <ArrowUpRight size={15}/></a>}</div></div></article>)}</div>:
      <div className="empty-state"><h2>Portfolio akan tampil di sini.</h2><p>Admin dapat menambah project, screenshot, kategori, studi kasus, teknologi, dan link preview dari dashboard.</p></div>}
    </div></section>
  </main>
}
