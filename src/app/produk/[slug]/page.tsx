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

  return (
    <main>
      <SiteHeader settings={settings}/>
      <section className="product-detail-hero section-dark">
        <div className="container">
          <Link href="/#produk" className="back-link"><ArrowLeft size={16}/> Semua produk</Link>
          <div className="product-detail-grid">
            <div>
              <div className="eyebrow light">{p.category}</div>
              <h1>{p.name}</h1>
              <p className="hero-lead">{p.description || p.shortDescription}</p>
              <div className="price-big">{rupiah(p.price)}</div>
              <div className="hero-actions">
                {p.checkoutEnabled && <Link className="button button-light" href={`/checkout/${p.slug}`}>Beli Sekarang <ArrowUpRight size={18}/></Link>}
                {p.demoUrl && <a className="button button-ghost-light" href={p.demoUrl} target="_blank" rel="noreferrer">Coba Demo</a>}
              </div>
            </div>
            <div className="detail-device">
              {p.imageUrl ? <img src={p.imageUrl} alt={p.name}/> : <div className="device-placeholder"><MonitorSmartphone size={42}/><strong>{p.name}</strong><span>Preview produk dapat diganti lewat Admin</span></div>}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container product-detail-content">
          <div className="section-heading"><div className="eyebrow">APA YANG DIDAPAT</div><h2>Dibuat untuk langsung berguna.</h2></div>
          <div className="feature-grid">
            {(p.features?.length ? p.features : ["Akses produk digital","Tampilan responsif","Dukungan penggunaan"]).map((f:string)=><div className="feature-box" key={f}><Check size={18}/><span>{f}</span></div>)}
          </div>
          {p.appUrl && <div className="app-link-card"><div><strong>Sudah punya akses?</strong><p>Buka aplikasi melalui alamat resmi produk.</p></div><a href={p.appUrl} target="_blank" rel="noreferrer" className="button">Buka Aplikasi <ArrowUpRight size={18}/></a></div>}
        </div>
      </section>
      <section className="section final-cta section-dark">
        <div className="container final-cta-inner"><div><div className="eyebrow light">MASIH RAGU?</div><h2>Tanyakan tentang {p.name}.</h2><p>Kami bantu jelaskan sebelum Anda membeli.</p></div><WhatsAppLink number={contact.whatsapp || ""} message={`Halo Teman Digital, saya ingin bertanya tentang ${p.name}.`} label="Tanya via WhatsApp" subject={p.name} className="button button-light"/></div>
      </section>
    </main>
  );
}
