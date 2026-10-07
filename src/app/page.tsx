import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { getFaqs, getHomepageSections, getPortfolios, getProducts, getServices, getSettings, getTestimonials } from "@/lib/cms";
import { rupiah } from "@/lib/format";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const dynamic = "force-dynamic";

type SectionConfig = {
  enabled: boolean;
  sortOrder: number;
  eyebrow: string;
  title: string;
  body: string;
};

export default async function HomePage() {
  const [settings, products, services, portfolios, testimonials, faqs, sectionRows] = await Promise.all([
    getSettings(), getProducts(), getServices(), getPortfolios(), getTestimonials(), getFaqs(), getHomepageSections()
  ]);

  const hero = settings.hero || {};
  const contact = settings.contact || {};
  const whatsappDigits = String(contact.whatsapp || "").replace(/\D/g,"").replace(/^0/,"62");
  const trust = settings.trust || {};
  const commerce = settings.commerce || {};
  const processSettings = settings.process || {};
  const footerSettings = settings.footer || {};
  const processSteps = Array.isArray(processSettings.steps) && processSettings.steps.length ? processSettings.steps : [
    {title:"Ceritakan",description:"Tidak perlu brief sempurna."},
    {title:"Kami pahami",description:"Masalah diterjemahkan menjadi solusi."},
    {title:"Kami bangun",description:"Desain dan development dikerjakan."},
    {title:"Anda review",description:"Revisi mengikuti paket yang dipilih."},
    {title:"Launch",description:"Produk siap digunakan."},
    {title:"Tetap ditemani",description:"Bug dalam scope tetap kami bantu."}
  ];
  const trustTags = Array.isArray(trust.tags) && trust.tags.length ? trust.tags : ["Produktivitas","Pendidikan","Bisnis","Wedding","Dashboard","Web"];
  const helpLinks = Array.isArray(footerSettings.helpLinks) && footerSettings.helpLinks.length ? footerSettings.helpLinks : [
    {label:"FAQ",href:"/#faq"},
    {label:"Portfolio",href:"/portfolio"}
  ];
  const featuredPortfolio = portfolios.slice(0, 3);
  const byKey = new Map(sectionRows.map((x:any) => [x.sectionKey, x]));

  const section = (key:string, defaults:Omit<SectionConfig,"enabled"|"sortOrder">, order:number):SectionConfig => {
    const row:any = byKey.get(key);
    return {
      enabled: row?.enabled ?? true,
      sortOrder: row?.sortOrder ?? order,
      eyebrow: row?.eyebrow || defaults.eyebrow,
      title: row?.title || defaults.title,
      body: row?.body || defaults.body,
    };
  };

  const choices = section("choices", {
    eyebrow:"MULAI DARI SINI",
    title:"Sudah jadi, atau bangun milikmu sendiri.",
    body:"Dua jalur yang jelas. Pilih produk siap pakai untuk mulai cepat, atau ceritakan kebutuhanmu untuk solusi custom."
  },10);
  const productSection = section("products", {
    eyebrow:"PRODUK TEMAN DIGITAL",
    title:"Solusi siap pakai untuk pekerjaan yang nyata.",
    body:""
  },20);
  const serviceSection = section("services", {
    eyebrow:"JASA CUSTOM",
    title:"Butuh sesuatu yang khusus?",
    body:"Harga awal transparan. Scope dibahas lebih dulu supaya solusi yang dibuat tepat, bukan sekadar banyak fitur."
  },30);
  const portfolioSection = section("portfolio", {
    eyebrow:"SELECTED WORKS",
    title:"Bukan sekadar dibuat. Harus berguna.",
    body:""
  },40);
  const processSection = section("process", {
    eyebrow:"CARA KAMI BEKERJA",
    title:"Dari cerita singkat sampai siap dipakai.",
    body:""
  },50);
  const warrantySection = section("warranty", {
    eyebrow:"GARANSI TEMAN DIGITAL",
    title:"Bug tidak punya masa garansi.",
    body:"Jika error terjadi pada fitur yang termasuk scope awal pekerjaan, kami tetap membantu memperbaikinya. Penambahan fitur atau perubahan scope baru tidak termasuk garansi."
  },60);
  const testimonialSection = section("testimonials", {
    eyebrow:"CERITA PENGGUNA",
    title:"Yang paling penting: benar-benar membantu.",
    body:""
  },70);
  const faqSection = section("faq", {
    eyebrow:"FAQ",
    title:"Sebelum mulai, mungkin ini yang ingin ditanyakan.",
    body:"Pertanyaan umum tentang produk, jasa, proses pengerjaan, pembayaran, revisi, dan garansi."
  },80);
  const consultationSection = section("consultation", {
    eyebrow:"MULAI DARI CERITA",
    title:"Ada ide? Ceritakan saja dulu.",
    body:"Tidak harus tahu teknologi apa yang dibutuhkan. Jelaskan masalah atau idenya, kami bantu memikirkan langkah berikutnya."
  },90);

  const blocks:{key:string;order:number;enabled:boolean;node:React.ReactNode}[] = [
    {
      key:"choices", order:choices.sortOrder, enabled:choices.enabled,
      node:<section className="section" id="pilihan">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow">{choices.eyebrow}</div><h2>{choices.title}</h2></div>
            <p>{choices.body}</p>
          </div>
          <div className="choice-grid">
            <Link href="#produk" className="choice-card ready">
              <span className="choice-index">01</span>
              <div><Sparkles size={28}/><h3>Produk Siap Pakai</h3><p>Aplikasi yang sudah kami bangun untuk kebutuhan nyata dan siap digunakan.</p></div>
              <span className="choice-link">Jelajahi Produk <ArrowUpRight size={18}/></span>
            </Link>
            <a href="#konsultasi" className="choice-card custom">
              <span className="choice-index">02</span>
              <div><MessageCircle size={28}/><h3>Pembuatan Custom</h3><p>Punya kebutuhan sendiri? Ceritakan masalah atau idenya, kami bantu wujudkan.</p></div>
              <span className="choice-link">Konsultasikan Project <ArrowUpRight size={18}/></span>
            </a>
          </div>
        </div>
      </section>
    },
    {
      key:"products", order:productSection.sortOrder, enabled:productSection.enabled,
      node:<section className="section products-section" id="produk">
        <div className="container">
          <div className="section-heading"><div className="eyebrow">{productSection.eyebrow}</div><h2>{productSection.title}</h2>{productSection.body&&<p>{productSection.body}</p>}</div>
          <div className="product-showcase">
            {products.map((p:any, i:number) => (
              <article className={`product-showcase-item ${i % 2 ? "reverse" : ""}`} key={p.slug}>
                <a className="product-showcase-preview" href={p.demoUrl || p.appUrl || `/produk/${p.slug}`} target={p.demoUrl || p.appUrl ? "_blank" : undefined} rel={p.demoUrl || p.appUrl ? "noreferrer" : undefined} aria-label={`Buka preview ${p.name}`}>
                  <div className="browser-frame">
                    <div className="browser-bar"><span/><span/><span/><em>{p.demoUrl ? new URL(p.demoUrl).hostname : "temandigital.app"}</em></div>
                    {p.imageUrl ? <img src={p.imageUrl} alt={`Preview ${p.name}`} loading="lazy"/> : <div className="app-preview"><div className="app-preview-nav"><span/><span/><span/></div><div className="app-preview-body"><div className="preview-line wide"/><div className="preview-line"/><div className="preview-panels"><i/><i/><i/></div></div></div>}
                  </div>
                  <span className="preview-hover">Buka live preview <ArrowUpRight size={16}/></span>
                </a>
                <div className="product-showcase-copy">
                  <div className="showcase-index">0{i+1}</div>
                  <div className="showcase-tags"><span>{p.category}</span>{p.badge&&<span>{p.badge}</span>}</div>
                  <h3>{p.name}</h3>
                  <p>{p.shortDescription}</p>
                  <strong className="showcase-price">{rupiah(p.price)}</strong>
                  <div className="showcase-actions">
                    {(p.demoUrl || p.appUrl) && <a className="button button-secondary" href={p.demoUrl || p.appUrl} target="_blank" rel="noreferrer">Lihat Live Preview <ArrowUpRight size={16}/></a>}
                    <Link className="button" href={p.checkoutEnabled ? `/checkout/${p.slug}` : `/produk/${p.slug}`}>{p.checkoutEnabled ? `Beli ${p.name}` : "Lihat Detail"}</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    },
    {
      key:"services", order:serviceSection.sortOrder, enabled:serviceSection.enabled,
      node:<section className="section services-section" id="jasa">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow">{serviceSection.eyebrow}</div><h2>{serviceSection.title}</h2></div>
            <p>{serviceSection.body}</p>
          </div>
          <div className="service-list">
            {services.map((s:any, i:number) => (
              <div className="service-row" key={s.slug}>
                <span className="service-index">0{i+1}</span>
                <div className="service-name"><h3>{s.name}</h3><p>{s.description}</p></div>
                <div className="service-facts"><span>{s.duration}</span><span>{s.revisions}</span></div>
                <div className="service-price"><small>Mulai</small><strong>{rupiah(s.startingPrice)}</strong></div>
                <WhatsAppLink number={contact.whatsapp || ""} message={s.whatsappMessage || `Halo Teman Digital, saya ingin konsultasi ${s.name}.`} label="Konsultasi" subject={s.name} className="round-link"/>
              </div>
            ))}
          </div>
        </div>
      </section>
    },
    {
      key:"portfolio", order:portfolioSection.sortOrder, enabled:portfolioSection.enabled,
      node:<section className="section section-dark portfolio-section" id="portfolio">
        <div className="container">
          <div className="section-heading light split-heading">
            <div><div className="eyebrow light">{portfolioSection.eyebrow}</div><h2>{portfolioSection.title}</h2>{portfolioSection.body&&<p>{portfolioSection.body}</p>}</div>
            <Link href="/portfolio" className="button button-ghost-light">Lihat semua portfolio <ArrowUpRight size={18}/></Link>
          </div>
          {featuredPortfolio.length ? <div className="portfolio-showcase">{featuredPortfolio.map((p:any, i:number) => (
            <article className="portfolio-showcase-item" key={p.slug}>
              <a className="portfolio-showcase-preview" href={p.previewUrl || `/portfolio/${p.slug}`} target={p.previewUrl ? "_blank" : undefined} rel={p.previewUrl ? "noreferrer" : undefined}>
                {p.coverUrl ? <img src={p.coverUrl} alt={`Preview ${p.title}`} loading="lazy"/> : <div className="portfolio-placeholder"><span>{p.category}</span><strong>{p.title}</strong></div>}
                {p.previewUrl && <span className="preview-hover dark-hover">Buka project <ArrowUpRight size={16}/></span>}
              </a>
              <div className="portfolio-showcase-copy">
                <span className="portfolio-number">0{i+1}</span>
                <div className="eyebrow light">{p.category}</div>
                <h3>{p.title}</h3><p>{p.summary}</p>
                {p.technologies?.length>0&&<div className="showcase-tags dark">{p.technologies.slice(0,4).map((x:string)=><span key={x}>{x}</span>)}</div>}
                <div className="showcase-actions">
                  {p.previewUrl&&<a className="button button-light" href={p.previewUrl} target="_blank" rel="noreferrer">Lihat Project <ArrowUpRight size={16}/></a>}
                  <Link href={`/portfolio/${p.slug}`} className="button button-ghost-light">Studi Kasus</Link>
                </div>
              </div>
            </article>
          ))}</div> : <div className="empty-showcase"><span>Portfolio siap ditambahkan dari Dashboard Admin</span><strong>Tambahkan screenshot, deskripsi, teknologi, dan URL preview tanpa menyentuh kode.</strong></div>}
        </div>
      </section>
    },
    {
      key:"process", order:processSection.sortOrder, enabled:processSection.enabled,
      node:<section className="section process-section" id="cara-kerja">
        <div className="container">
          <div className="section-heading"><div className="eyebrow">{processSection.eyebrow}</div><h2>{processSection.title}</h2>{processSection.body&&<p>{processSection.body}</p>}</div>
          <div className="process-flow">
            {processSteps.map((step:any,i:number) => <div className="process-step" key={String(step.title||i)}><span>{String(i+1).padStart(2,"0")}</span><h3>{step.title || "Langkah"}</h3><p>{step.description || ""}</p></div>)}
          </div>
        </div>
      </section>
    },
    {
      key:"warranty", order:warrantySection.sortOrder, enabled:warrantySection.enabled,
      node:<section className="section warranty-section">
        <div className="container warranty-card">
          <div className="warranty-icon"><ShieldCheck size={38}/></div>
          <div><div className="eyebrow light">{warrantySection.eyebrow}</div><h2>{warrantySection.title}</h2></div>
          <p>{warrantySection.body}</p>
        </div>
      </section>
    },
    {
      key:"testimonials", order:testimonialSection.sortOrder, enabled:testimonialSection.enabled && testimonials.length>0,
      node:<section className="section">
        <div className="container">
          <div className="section-heading"><div className="eyebrow">{testimonialSection.eyebrow}</div><h2>{testimonialSection.title}</h2>{testimonialSection.body&&<p>{testimonialSection.body}</p>}</div>
          <div className="testimonial-grid">{testimonials.map((t:any)=><blockquote className="testimonial" key={t.id}><p>“{t.quote}”</p><footer><strong>{t.name}</strong><span>{[t.role,t.company].filter(Boolean).join(" · ")}</span></footer></blockquote>)}</div>
        </div>
      </section>
    },
    {
      key:"faq", order:faqSection.sortOrder, enabled:faqSection.enabled,
      node:<section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div className="faq-intro"><div className="eyebrow">{faqSection.eyebrow}</div><h2>{faqSection.title}</h2><p>{faqSection.body}</p></div>
          <div className="faq-list">
            {(faqs.length ? faqs : [
              {id:-1,question:"Apakah bisa request desain?",answer:"Bisa. Untuk jasa custom, kebutuhan visual dibahas pada tahap brief."},
              {id:-2,question:"Berapa lama pengerjaannya?",answer:"Landing Page 2–4 hari kerja, Dashboard 4–7 hari kerja, dan Web Custom maksimal 7 hari kerja setelah brief, bahan, dan DP lengkap."},
              {id:-3,question:"Apa yang termasuk garansi?",answer:"Bug/error pada fitur yang sudah termasuk dalam scope awal. Penambahan fitur atau perubahan scope baru berada di luar garansi."},
            ]).map((f:any)=><details key={f.id}><summary>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}
          </div>
        </div>
      </section>
    },
    {
      key:"consultation", order:consultationSection.sortOrder, enabled:consultationSection.enabled,
      node:<section className="section final-cta section-dark" id="konsultasi">
        <div className="flow flow-c" />
        <div className="container final-cta-inner">
          <div><div className="eyebrow light">{consultationSection.eyebrow}</div><h2>{consultationSection.title}</h2><p>{consultationSection.body}</p></div>
          <div className="cta-buttons">
            <WhatsAppLink number={contact.whatsapp || ""} message="Halo Teman Digital, saya punya ide/kebutuhan digital dan ingin konsultasi." label="Konsultasi via WhatsApp" subject="Final CTA" className="button button-light"/>
            <a href="#produk" className="button button-ghost-light">Lihat Produk</a>
          </div>
        </div>
      </section>
    }
  ];

  return (
    <main>
      <SiteHeader settings={settings} />

      <section className="hero section-dark">
        <div className="flow flow-a" />
        <div className="flow flow-b" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow light">{hero.eyebrow || "PRODUK & SOLUSI DIGITAL"}</div>
            <h1>{hero.title || "Bikin digital jadi lebih mudah."}</h1>
            <p className="hero-lead">{hero.body}</p>
            <div className="hero-actions">
              <a className="button button-light" href={hero.primaryHref || "#produk"}>{hero.primaryLabel || "Jelajahi Produk"} <ArrowUpRight size={18}/></a>
              <WhatsAppLink number={contact.whatsapp || ""} message="Halo Teman Digital, saya ingin konsultasi tentang kebutuhan digital saya." label={hero.secondaryLabel || "Konsultasi via WhatsApp"} subject="Konsultasi dari Homepage" className="button button-ghost-light"/>
            </div>
            <div className="hero-proof">
              <span><Check size={15}/> {commerce.proofProduct || "Produk mulai Rp39 ribu"}</span>
              <span><Check size={15}/> {commerce.proofConsultation || "Konsultasi tanpa biaya"}</span>
              <span><Check size={15}/> {commerce.proofWarranty || "Garansi bug sesuai scope"}</span>
            </div>
          </div>
          <div className="product-universe" aria-label="Ekosistem produk Teman Digital">
            <div className="universe-glow" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="universe-center"><span>Teman</span><strong>Digital</strong><small>PRODUCT UNIVERSE</small></div>
            {products.slice(0,4).map((p:any, i:number) => <Link href={`/produk/${p.slug}`} className={`floating-product fp-${i+1}`} key={p.slug}><div className="mini-app-top"><span className="mini-dot"/><span>{p.category}</span></div><strong>{p.name}</strong><small>{p.shortDescription}</small><span className="mini-price">{rupiah(p.price)}</span></Link>)}
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-row">
          <strong>{trust.title || "Produk digital yang benar-benar dibuat untuk digunakan."}</strong>
          <div className="trust-tags">{trustTags.map((tag:string)=><span key={tag}>{tag}</span>)}</div>
        </div>
      </section>

      <section className="motion-marquee" aria-label="Layanan Teman Digital">
        <div className="marquee-track">
          {[0,1].map((loop)=><div className="marquee-set" aria-hidden={loop===1} key={loop}>
            {["WEBSITE","DASHBOARD","PWA","PRODUK DIGITAL","DESAIN CLEAN","RESPONSIF","SIAP DIPAKAI"].map((item)=><span key={`${loop}-${item}`}><b>✦</b>{item}</span>)}
          </div>)}
        </div>
      </section>

      <div className="home-sections">
        {blocks.filter(x=>x.enabled).sort((a,b)=>a.order-b.order).map(x=><div className="home-section-slot" key={x.key}>{x.node}</div>)}
      </div>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand"><strong>{settings.brand?.name || "Teman Digital"}</strong><p>{settings.brand?.tagline}</p><small>{settings.footer?.note}</small></div>
          <div><strong>Produk</strong>{products.slice(0,5).map((p:any)=><Link href={`/produk/${p.slug}`} key={p.slug}>{p.name}</Link>)}</div>
          <div><strong>Layanan</strong>{services.map((s:any)=><a href="#jasa" key={s.slug}>{s.name}</a>)}</div>
          <div><strong>Bantuan</strong>{helpLinks.map((item:any,i:number)=><a href={item.href || "#"} key={String(item.label||i)}>{item.label || "Link"}</a>)}<a href={`mailto:${contact.email || "temandigital26@gmail.com"}`}>Email</a>{whatsappDigits&&<a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer">WhatsApp</a>}{contact.instagram&&<a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>}{contact.tiktok&&<a href={contact.tiktok} target="_blank" rel="noreferrer">TikTok</a>}</div>
        </div>
        <div className="container footer-bottom"><span>{footerSettings.copyright || `© 2026 ${settings.brand?.name || "Teman Digital"}`}</span><span>{footerSettings.closingTagline || settings.brand?.tagline || "Bangun Lebih Baik. Tumbuh Lebih Cepat."}</span></div>
      </footer>
    </main>
  );
}
