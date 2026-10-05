import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getPortfolio, getSettings } from "@/lib/cms";
import { SiteHeader } from "@/components/site-header";

export const dynamic="force-dynamic";

export default async function PortfolioDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [item,settings]=await Promise.all([getPortfolio(slug),getSettings()]);
  if(!item) notFound();
  const p:any=item;

  return <main>
    <SiteHeader settings={settings}/>
    <section className="case-hero section-dark">
      <div className="container">
        <Link href="/portfolio" className="back-link"><ArrowLeft size={16}/> Semua portfolio</Link>
        <div className="eyebrow light">{p.category}</div>
        <h1>{p.title}</h1>
        <p className="hero-lead">{p.summary}</p>
        <div className="case-actions">
          {p.previewUrl&&<a className="button button-light" href={p.previewUrl} target="_blank" rel="noreferrer">Preview Web <ArrowUpRight size={17}/></a>}
          {p.sourceUrl&&<a className="button button-ghost-light" href={p.sourceUrl} target="_blank" rel="noreferrer">Link Project <ArrowUpRight size={17}/></a>}
        </div>
      </div>
    </section>

    <section className="case-cover-section">
      <div className="container">
        <div className="case-cover">{p.coverUrl?<img src={p.coverUrl} alt={p.title}/>:<div className="portfolio-placeholder"><span>{p.category}</span><strong>{p.title}</strong></div>}</div>
      </div>
    </section>

    <section className="section case-story">
      <div className="container case-story-grid">
        <aside>
          <span className="checkout-step">STUDI KASUS</span>
          <div className="chip-row">{(p.technologies||[]).map((x:string)=><span key={x}>{x}</span>)}</div>
        </aside>
        <div className="case-sections">
          <article><span>01</span><h2>Masalah</h2><p>{p.challenge||"Konteks dan tantangan project dapat ditambahkan melalui Dashboard Admin."}</p></article>
          <article><span>02</span><h2>Solusi</h2><p>{p.solution||"Pendekatan dan solusi yang dibangun dapat ditambahkan melalui Dashboard Admin."}</p></article>
          <article><span>03</span><h2>Hasil</h2><p>{p.result||"Hasil implementasi dapat ditambahkan melalui Dashboard Admin."}</p></article>
        </div>
      </div>
    </section>

    {p.gallery?.length>0&&<section className="section case-gallery-section"><div className="container"><div className="section-heading"><div className="eyebrow">PROJECT GALLERY</div><h2>Lebih dekat dengan hasil akhirnya.</h2></div><div className="case-gallery">{p.gallery.map((url:string,i:number)=><img src={url} alt={p.title+" "+(i+1)} key={url}/>)}</div></div></section>}
  </main>
}
