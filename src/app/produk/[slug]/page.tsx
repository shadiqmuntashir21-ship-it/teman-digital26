import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MonitorSmartphone } from "lucide-react";
import { getProduct, getSettings } from "@/lib/cms";
import { rupiah } from "@/lib/format";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProduct(slug), getSettings()]);
  if (!product) notFound();
  const p:any = product;
  const contact = settings.contact || {};
  const features = p.features?.length ? p.features : ["Akses produk digital","Tampilan responsif","Dukungan penggunaan"];

  return (
    <main>
      <SiteHeader settings={settings}/>
      <section className="product-detail-hero section-dark">
        <div className="container">
          <Link href="/#produk" className="back-link"><ArrowLeft size={16}/> Semua produk</Link>
          <div className="product-detail-grid">
            <div>
              <div className="product-detail-labels"><span className="eyebrow light">{p.category}</span>{p.badge&&<span className="product-detail-badge">{p.badge}</span>}</div>
              <h1>{p.name}</h1>
              <p className="hero-lead">{p.description || p.shortDescription}</p>
              <div className="price-line">
                <div className="price-big">{rupiah(p.price)}</div>
                {p.compareAtPrice&&Number(p.compareAtPrice)>Number(p.price)&&<span className="compare-price">{rupiah(p.compareAtPrice)}</span>}
              </div>
              <div className="hero-actions">
                {p.checkoutEnabled && <Link className="button button-light" href={`/checkout/${p.slug}`}>Beli Sekarang <ArrowUpRight size={18}/></Link>}
                {p.demoUrl && <a className="button button-ghost-light" href={p.demoUrl} target="_blank" rel="noreferrer">Coba Demo</a>}
              </div>
              <div className="product-micro-proof"><span><Check size={14}/> Sekali bayar sesuai penawaran</span><span><Check size={14}/> Akses dikirim setelah pembayaran terverifikasi</span></div>
            </div>
            <div className="detail-device">
              {p.imageUrl ? <img src={p.imageUrl} alt={p.name}/> : <div className="device-placeholder"><MonitorSmartphone size={42}/><strong>{p.name}</strong><span>Upload screenshot produk lewat Dashboard Admin</span></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="section product-benefit-section">
        <div className="container product-detail-content">
          <div className="section-heading"><div className="eyebrow">YANG ANDA DAPAT</div><h2>Dibuat untuk langsung berguna.</h2><p>{p.shortDescription}</p></div>
          <div className="feature-grid">
            {features.map((f:string)=><div className="feature-box" key={f}><Check size={18}/><span>{f}</span></div>)}
          </div>
        </div>
      </section>

      {p.gallery?.length>0&&<section className="section product-gallery-section">
        <div className="container">
          <div className="section-heading"><div className="eyebrow">LIHAT PRODUKNYA</div><h2>Bukan janji. Ini tampilannya.</h2></div>
          <div className="product-gallery">{p.gallery.map((url:string,i:number)=><div className="product-gallery-item" key={url}><img src={url} alt={`${p.name} preview ${i+1}`}/></div>)}</div>
        </div>
      </section>}

      {p.audience?.length>0&&<section className="section audience-section">
        <div className="container">
          <div className="section-heading split-heading"><div><div className="eyebrow">UNTUK SIAPA</div><h2>{p.name} cocok kalau Anda...</h2></div><p>Produk dibuat untuk kebutuhan nyata, bukan sekadar menambah fitur.</p></div>
          <div className="audience-grid">{p.audience.map((x:string,i:number)=><div className="audience-card" key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div>
        </div>
      </section>}

      {p.appUrl && <section className="section product-access-section"><div className="container"><div className="app-link-card"><div><span className="eyebrow">SUDAH PUNYA AKSES?</span><strong>Buka {p.name}</strong><p>Akses aplikasi melalui alamat resmi produk Teman Digital.</p></div><a href={p.appUrl} target="_blank" rel="noreferrer" className="button">Buka Aplikasi <ArrowUpRight size={18}/></a></div></div></section>}

      {p.faq?.length>0&&<section className="section product-faq-section">
        <div className="container faq-grid">
          <div className="faq-intro"><div className="eyebrow">FAQ {p.name.toUpperCase()}</div><h2>Yang sering ditanyakan sebelum membeli.</h2></div>
          <div className="faq-list">{p.faq.map((f:any,i:number)=><details key={i}><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div>
        </div>
      </section>}

      <section className="section final-cta section-dark">
        <div className="container final-cta-inner">
          <div><div className="eyebrow light">MASIH RAGU?</div><h2>Tanyakan tentang {p.name}.</h2><p>Kami bantu jelaskan produknya sebelum Anda membeli.</p></div>
          <div className="cta-buttons">
            {p.checkoutEnabled&&<Link className="button button-light" href={`/checkout/${p.slug}`}>Beli {p.name}</Link>}
            <WhatsAppLink number={contact.whatsapp || ""} message={`Halo Teman Digital, saya ingin bertanya tentang ${p.name}.`} label="Tanya via WhatsApp" subject={p.name} className="button button-ghost-light"/>
          </div>
        </div>
      </section>

      {p.checkoutEnabled&&<div className="product-mobile-buy"><div><small>{p.name}</small><strong>{rupiah(p.price)}</strong></div><Link href={`/checkout/${p.slug}`}>Beli Sekarang</Link></div>}
    </main>
  );
}
