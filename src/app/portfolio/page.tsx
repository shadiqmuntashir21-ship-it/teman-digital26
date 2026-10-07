import { ArrowUpRight } from "lucide-react";
import { getPortfolios, getSettings } from "@/lib/cms";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [items, settings] = await Promise.all([getPortfolios(), getSettings()]);
  const page = settings.portfolioPage || {};
  return <main>
    <SiteHeader settings={settings}/>
    <section className="page-hero section-dark"><div className="container"><div className="eyebrow light">{page.eyebrow || "PORTFOLIO"}</div><h1>{page.title || "Masalah nyata. Solusi yang benar-benar dipakai."}</h1><p className="hero-lead">{page.body || "Kami menampilkan project sebagai studi kasus—bukan sekadar galeri screenshot."}</p></div></section>
    <section className="section"><div className="container">
      {items.length ? <div className="portfolio-page-showcase">{items.map((p:any,i:number)=><article className="portfolio-page-feature" key={p.slug}><a className="portfolio-page-image" href={p.previewUrl || `/portfolio/${p.slug}`} target={p.previewUrl?"_blank":undefined} rel={p.previewUrl?"noreferrer":undefined}>{p.coverUrl?<img src={p.coverUrl} alt={`Preview ${p.title}`} loading="lazy"/>:<div className="portfolio-placeholder"><span>{p.category}</span><strong>{p.title}</strong></div>}<span className="preview-hover">Buka live project <ArrowUpRight size={16}/></span></a><div className="portfolio-page-copy"><span className="portfolio-number">0{i+1}</span><span>{p.category}</span><h2>{p.title}</h2><p>{p.summary}</p>{p.technologies?.length>0&&<div className="chip-row">{p.technologies.map((x:string)=><span key={x}>{x}</span>)}</div>}<div className="portfolio-actions"><a className="button" href={`/portfolio/${p.slug}`}>{page.caseStudyLabel || "Lihat Studi Kasus"} <ArrowUpRight size={17}/></a>{p.previewUrl&&<a className="text-link" target="_blank" rel="noreferrer" href={p.previewUrl}>{page.previewLabel || "Preview Web"} <ArrowUpRight size={15}/></a>}</div></div></article>)}</div>:
      <div className="empty-state"><h2>{page.emptyTitle || "Portfolio akan tampil di sini."}</h2><p>{page.emptyBody || "Admin dapat menambah project, screenshot, kategori, studi kasus, teknologi, dan link preview dari dashboard."}</p></div>}
    </div></section>
  </main>
}
