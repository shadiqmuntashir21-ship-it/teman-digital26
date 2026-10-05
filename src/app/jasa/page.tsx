import { ArrowUpRight } from "lucide-react";
import { getServices, getSettings } from "@/lib/cms";
import { rupiah } from "@/lib/format";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const contact = settings.contact || {};
  const page = settings.servicesPage || {};
  return <main>
    <SiteHeader settings={settings}/>
    <section className="page-hero section-dark"><div className="container"><div className="eyebrow light">{page.eyebrow || "JASA TEMAN DIGITAL"}</div><h1>{page.title || "Solusi custom, tanpa dibuat rumit."}</h1><p className="hero-lead">{page.body || "Ceritakan kebutuhanmu. Kami bantu merancang solusi yang tepat dan tetap realistis untuk digunakan."}</p></div></section>
    <section className="section"><div className="container service-page-list">
      {services.map((s:any,i:number)=><article className="service-page-card" key={s.slug}><span className="service-index">0{i+1}</span><div><h2>{s.name}</h2><p>{s.description}</p><div className="chip-row">{(s.features||[]).map((x:string)=><span key={x}>{x}</span>)}</div></div><div className="service-page-side"><small>Mulai</small><strong>{rupiah(s.startingPrice)}</strong><span>{s.duration}</span><span>{s.revisions}</span><WhatsAppLink number={contact.whatsapp||""} message={s.whatsappMessage || `Halo Teman Digital, saya ingin konsultasi ${s.name}.`} label="Konsultasi" subject={s.name} className="button"/></div></article>)}
    </div></section>
    <section className="section final-cta section-dark"><div className="container final-cta-inner"><div><div className="eyebrow light">{page.finalEyebrow || "BELUM TAHU PAKETNYA?"}</div><h2>{page.finalTitle || "Ceritakan masalahnya, bukan teknologinya."}</h2></div><WhatsAppLink number={contact.whatsapp||""} message={page.finalWhatsappMessage || "Halo Teman Digital, saya punya kebutuhan digital tapi belum tahu layanan yang cocok."} label={page.finalButton || "Konsultasi Gratis"} subject="Jasa umum" className="button button-light"/></div></section>
  </main>
}
