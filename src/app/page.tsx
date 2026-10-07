import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getPortfolios, getProducts, getServices, getSettings } from "@/lib/cms";
import { rupiah } from "@/lib/format";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, products, portfolios, services] = await Promise.all([
    getSettings(), getProducts(), getPortfolios(), getServices()
  ]);

  const brand = settings.brand || {};
  const hero = settings.hero || {};
  const contact = settings.contact || {};
  const footer = settings.footer || {};
  const showcaseProducts = products.slice(0,3);
  const selectedWorks = portfolios.slice(0,3);
  const whatsappDigits = String(contact.whatsapp || "").replace(/\D/g,"").replace(/^0/,"62");

  return (
    <main className="karva-v2">
      <SiteHeader settings={settings} />

      <section className="kv-hero">
        <div className="kv-hero-grid container">
          <div className="kv-hero-copy kv-reveal">
            <span className="kv-kicker">DIGITAL PRODUCT STUDIO</span>
            <h1>{hero.title || "Ide diwujudkan. Nilai diciptakan."}</h1>
            <p>{hero.body || "Produk digital siap pakai dan solusi custom untuk ide yang layak diwujudkan."}</p>
            <div className="kv-hero-actions">
              <a className="kv-button kv-button-light" href="#karya">Lihat Karya <ArrowUpRight size={17}/></a>
              <a className="kv-link-light" href="#project">Mulai Project <ArrowRight size={17}/></a>
            </div>
          </div>

          <div className="kv-showreel kv-reveal" aria-label="Showreel produk KARVA">
            <div className="kv-showreel-shell">
              {showcaseProducts.map((p:any,i:number)=>(
                <a
                  className="kv-hero-slide"
                  href={p.demoUrl || p.appUrl || `/produk/${p.slug}`}
                  target={p.demoUrl || p.appUrl ? "_blank" : undefined}
                  rel={p.demoUrl || p.appUrl ? "noreferrer" : undefined}
                  key={p.slug}
                  style={{animationDelay:`${i*5}s`}}
                >
                  <img src={p.imageUrl || "/previews/dailyn.jpg"} alt={`Preview ${p.name}`} />
                  <span className="kv-slide-index">0{i+1}</span>
                  <div className="kv-slide-caption">
                    <span>{p.category}</span>
                    <strong>{p.name}</strong>
                  </div>
                </a>
              ))}
              <div className="kv-showreel-slash" aria-hidden="true"/>
            </div>
          </div>
        </div>
      </section>

      <section className="kv-marquee" aria-label="Kemampuan KARVA">
        <div className="kv-marquee-track">
          {[0,1].map(loop=>(
            <div className="kv-marquee-set" aria-hidden={loop===1} key={loop}>
              {["DIGITAL PRODUCTS","WEB EXPERIENCES","DASHBOARDS","PWA","CUSTOM SYSTEMS"].map(item=>(
                <span key={`${loop}-${item}`}><b>✦</b>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="kv-products" id="produk">
        <div className="container">
          <div className="kv-section-head kv-reveal">
            <span className="kv-kicker dark">PRODUCTS</span>
            <h2>Produk yang sudah siap bekerja.</h2>
          </div>

          <div className="kv-product-list">
            {showcaseProducts.map((p:any,i:number)=>(
              <article className={`kv-product kv-reveal ${i%2 ? "is-reverse" : ""}`} key={p.slug}>
                <div className="kv-product-copy">
                  <span className="kv-number">0{i+1}</span>
                  <div className="kv-product-meta">{p.category}</div>
                  <h3>{p.name}</h3>
                  <p>{p.shortDescription}</p>
                  <div className="kv-product-bottom">
                    <strong>{rupiah(p.price)}</strong>
                    <div className="kv-inline-actions">
                      {(p.demoUrl || p.appUrl) && <a href={p.demoUrl || p.appUrl} target="_blank" rel="noreferrer">Coba <ArrowUpRight size={15}/></a>}
                      <Link href={p.checkoutEnabled ? `/checkout/${p.slug}` : `/produk/${p.slug}`}>Beli</Link>
                    </div>
                  </div>
                </div>
                <a
                  className="kv-product-visual"
                  href={p.demoUrl || p.appUrl || `/produk/${p.slug}`}
                  target={p.demoUrl || p.appUrl ? "_blank" : undefined}
                  rel={p.demoUrl || p.appUrl ? "noreferrer" : undefined}
                >
                  <img src={p.imageUrl || "/previews/dailyn.jpg"} alt={`Preview ${p.name}`} loading={i===0 ? "eager" : "lazy"} />
                  <span>Buka produk <ArrowUpRight size={15}/></span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kv-works" id="karya">
        <div className="container">
          <div className="kv-work-head kv-reveal">
            <span className="kv-kicker light">SELECTED WORK</span>
            <h2>Karya nyata.<br/>Dipakai untuk kebutuhan nyata.</h2>
            <Link href="/portfolio">Lihat semua karya <ArrowUpRight size={16}/></Link>
          </div>

          <div className="kv-work-list">
            {selectedWorks.map((p:any,i:number)=>(
              <article className={`kv-work kv-work-${i+1} kv-reveal`} key={p.slug}>
                <a
                  className="kv-work-image"
                  href={p.previewUrl || `/portfolio/${p.slug}`}
                  target={p.previewUrl ? "_blank" : undefined}
                  rel={p.previewUrl ? "noreferrer" : undefined}
                >
                  <img src={p.coverUrl || "/previews/etos-id-palu.jpg"} alt={`Preview ${p.title}`} loading="lazy"/>
                  <div className="kv-work-overlay">
                    <span>0{i+1} · {p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                    <span className="kv-work-open">Lihat project <ArrowUpRight size={16}/></span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kv-services" id="jasa">
        <div className="container">
          <div className="kv-section-head kv-reveal">
            <span className="kv-kicker dark">SERVICES</span>
            <h2>Butuh sesuatu yang khusus?</h2>
          </div>

          <div className="kv-service-list">
            {services.slice(0,3).map((s:any,i:number)=>(
              <a className="kv-service-row kv-reveal" href="#project" key={s.slug}>
                <span className="kv-service-index">0{i+1}</span>
                <div className="kv-service-main">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                </div>
                <span className="kv-service-time">{s.duration}</span>
                <strong>Mulai {rupiah(s.startingPrice)}</strong>
                <ArrowUpRight size={22}/>
              </a>
            ))}
          </div>

          <p className="kv-service-note kv-reveal">2–7 hari kerja · revisi termasuk · garansi bug sesuai scope awal</p>
        </div>
      </section>

      <section className="kv-project" id="project">
        <div className="kv-project-slash" aria-hidden="true"/>
        <div className="container kv-project-inner kv-reveal">
          <span className="kv-kicker light">START A PROJECT</span>
          <h2>Punya sesuatu yang ingin diwujudkan?</h2>
          <p>Ceritakan idenya. Teknologinya biar kami pikirkan.</p>
          <WhatsAppLink
            number={contact.whatsapp || ""}
            message="Halo KARVA, saya punya ide/kebutuhan digital dan ingin mulai project."
            label="Mulai Project"
            subject="KARVA Project Inquiry"
            className="kv-button kv-button-light kv-project-button"
          />
        </div>
      </section>

      <footer className="kv-footer">
        <div className="container kv-footer-grid">
          <div className="kv-footer-brand">
            <img src={brand.logoLightUrl || "/brand/karva-logo-light.png"} alt="KARVA"/>
            <p>{brand.tagline || "Ide diwujudkan. Nilai diciptakan."}</p>
          </div>
          <div>
            <strong>Produk</strong>
            {showcaseProducts.map((p:any)=><Link href={`/produk/${p.slug}`} key={p.slug}>{p.name}</Link>)}
          </div>
          <div>
            <strong>Studio</strong>
            <a href="#karya">Karya</a>
            <a href="#jasa">Jasa</a>
            <a href="#project">Mulai Project</a>
          </div>
          <div>
            <strong>Kontak</strong>
            <a href={`mailto:${contact.email || "temandigital26@gmail.com"}`}>Email</a>
            {whatsappDigits && <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer">WhatsApp</a>}
            {contact.instagram && <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>}
            {contact.tiktok && <a href={contact.tiktok} target="_blank" rel="noreferrer">TikTok</a>}
          </div>
        </div>
        <div className="container kv-footer-bottom">
          <span>{footer.copyright || "© 2026 KARVA"}</span>
          <span>{footer.closingTagline || brand.tagline || "Ide diwujudkan. Nilai diciptakan."}</span>
        </div>
      </footer>
    </main>
  );
}
