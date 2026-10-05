import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { getFaqs, getPortfolios, getProducts, getServices, getSettings, getTestimonials } from "@/lib/cms";
import { rupiah } from "@/lib/format";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, products, services, portfolios, testimonials, faqs] = await Promise.all([
    getSettings(), getProducts(), getServices(), getPortfolios(), getTestimonials(), getFaqs()
  ]);

  const hero = settings.hero || {};
  const contact = settings.contact || {};
  const featuredPortfolio = portfolios.slice(0, 3);

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
              <WhatsAppLink
                number={contact.whatsapp || ""}
                message="Halo Teman Digital, saya ingin konsultasi tentang kebutuhan digital saya."
                label={hero.secondaryLabel || "Konsultasi via WhatsApp"}
                subject="Konsultasi dari Homepage"
                className="button button-ghost-light"
              />
            </div>
            <div className="hero-proof">
              <span><Check size={15}/> Produk mulai Rp39 ribu</span>
              <span><Check size={15}/> Konsultasi tanpa biaya</span>
              <span><Check size={15}/> Garansi bug sesuai scope</span>
            </div>
          </div>

          <div className="product-universe" aria-label="Ekosistem produk Teman Digital">
            <div className="universe-glow" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="universe-center">
              <span>Teman</span>
              <strong>Digital</strong>
              <small>PRODUCT UNIVERSE</small>
            </div>
            {products.slice(0,4).map((p:any, i:number) => (
              <Link href={`/produk/${p.slug}`} className={`floating-product fp-${i+1}`} key={p.slug}>
                <div className="mini-app-top"><span className="mini-dot"/><span>{p.category}</span></div>
                <strong>{p.name}</strong>
                <small>{p.shortDescription}</small>
                <span className="mini-price">{rupiah(p.price)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-row">
          <strong>Produk digital yang benar-benar dibuat untuk digunakan.</strong>
          <div className="trust-tags">
            <span>Produktivitas</span><span>Pendidikan</span><span>Bisnis</span><span>Wedding</span><span>Dashboard</span><span>Web</span>
          </div>
        </div>
      </section>

      <section className="section" id="pilihan">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <div className="eyebrow">MULAI DARI SINI</div>
              <h2>Sudah jadi, atau bangun milikmu sendiri.</h2>
            </div>
            <p>Dua jalur yang jelas. Pilih produk siap pakai untuk mulai cepat, atau ceritakan kebutuhanmu untuk solusi custom.</p>
          </div>
          <div className="choice-grid">
            <Link href="#produk" className="choice-card ready">
              <span className="choice-index">01</span>
              <div>
                <Sparkles size={28}/>
                <h3>Produk Siap Pakai</h3>
                <p>Aplikasi yang sudah kami bangun untuk kebutuhan nyata dan siap digunakan.</p>
              </div>
              <span className="choice-link">Jelajahi Produk <ArrowUpRight size={18}/></span>
            </Link>
            <a href="#konsultasi" className="choice-card custom">
              <span className="choice-index">02</span>
              <div>
                <MessageCircle size={28}/>
                <h3>Pembuatan Custom</h3>
                <p>Punya kebutuhan sendiri? Ceritakan masalah atau idenya, kami bantu wujudkan.</p>
              </div>
              <span className="choice-link">Konsultasikan Project <ArrowUpRight size={18}/></span>
            </a>
          </div>
        </div>
      </section>

      <section className="section products-section" id="produk">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">PRODUK TEMAN DIGITAL</div>
            <h2>Solusi siap pakai untuk pekerjaan yang nyata.</h2>
          </div>
          <div className="product-grid">
            {products.map((p:any, i:number) => (
              <article className="product-card" key={p.slug}>
                <div className="product-visual">
                  <div className="product-number">0{i+1}</div>
                  <div className="app-preview">
                    <div className="app-preview-nav"><span/><span/><span/></div>
                    <div className="app-preview-body">
                      <div className="preview-line wide"/><div className="preview-line"/>
                      <div className="preview-panels"><i/><i/><i/></div>
                    </div>
                  </div>
                  {p.badge && <span className="badge">{p.badge}</span>}
                </div>
                <div className="product-meta">
                  <div>
                    <span className="category">{p.category}</span>
                    <h3>{p.name}</h3>
                    <p>{p.shortDescription}</p>
                  </div>
                  <div className="product-bottom">
                    <strong>{rupiah(p.price)}</strong>
                    <Link href={`/produk/${p.slug}`} className="text-link">Lihat detail <ChevronRight size={16}/></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="jasa">
        <div className="container">
          <div className="section-heading split-heading">
            <div><div className="eyebrow">JASA CUSTOM</div><h2>Butuh sesuatu yang khusus?</h2></div>
            <p>Harga awal transparan. Scope dibahas lebih dulu supaya solusi yang dibuat tepat, bukan sekadar banyak fitur.</p>
          </div>
          <div className="service-list">
            {services.map((s:any, i:number) => (
              <div className="service-row" key={s.slug}>
                <span className="service-index">0{i+1}</span>
                <div className="service-name"><h3>{s.name}</h3><p>{s.description}</p></div>
                <div className="service-facts"><span>{s.duration}</span><span>{s.revisions}</span></div>
                <div className="service-price"><small>Mulai</small><strong>{rupiah(s.startingPrice)}</strong></div>
                <WhatsAppLink
                  number={contact.whatsapp || ""}
                  message={s.whatsappMessage || `Halo Teman Digital, saya ingin konsultasi ${s.name}.`}
                  label="Konsultasi"
                  subject={s.name}
                  className="round-link"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark portfolio-section" id="portfolio">
        <div className="container">
          <div className="section-heading light split-heading">
            <div><div className="eyebrow light">SELECTED WORKS</div><h2>Bukan sekadar dibuat. Harus berguna.</h2></div>
            <Link href="/portfolio" className="button button-ghost-light">Lihat semua portfolio <ArrowUpRight size={18}/></Link>
          </div>
          {featuredPortfolio.length ? (
            <div className="portfolio-grid">
              {featuredPortfolio.map((p:any) => (
                <article className="portfolio-card" key={p.slug}>
                  <div className="portfolio-cover">
                    {p.coverUrl ? <img src={p.coverUrl} alt={p.title}/> : <div className="portfolio-placeholder"><span>{p.category}</span><strong>{p.title}</strong></div>}
                    {p.previewUrl && <a href={p.previewUrl} target="_blank" rel="noreferrer" className="live-chip">Preview live <ArrowUpRight size={14}/></a>}
                  </div>
                  <div className="portfolio-copy">
                    <span>{p.category}</span>
                    <h3>{p.title}</h3>
                    <p>{p.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-showcase">
              <span>Portfolio siap ditambahkan dari Dashboard Admin</span>
              <strong>Tambahkan screenshot, deskripsi, teknologi, dan URL preview tanpa menyentuh kode.</strong>
            </div>
          )}
        </div>
      </section>

      <section className="section process-section" id="cara-kerja">
        <div className="container">
          <div className="section-heading"><div className="eyebrow">CARA KAMI BEKERJA</div><h2>Dari cerita singkat sampai siap dipakai.</h2></div>
          <div className="process-flow">
            {[
              ["01","Ceritakan","Tidak perlu brief sempurna."],
              ["02","Kami pahami","Masalah diterjemahkan menjadi solusi."],
              ["03","Kami bangun","Desain dan development dikerjakan."],
              ["04","Anda review","Revisi mengikuti paket yang dipilih."],
              ["05","Launch","Produk siap digunakan."],
              ["06","Tetap ditemani","Bug dalam scope tetap kami bantu."],
            ].map(([n,t,d]) => <div className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section warranty-section">
        <div className="container warranty-card">
          <div className="warranty-icon"><ShieldCheck size={38}/></div>
          <div><div className="eyebrow light">GARANSI TEMAN DIGITAL</div><h2>Bug tidak punya masa garansi.</h2></div>
          <p>Jika error terjadi pada fitur yang termasuk scope awal pekerjaan, kami tetap membantu memperbaikinya. Penambahan fitur atau perubahan scope baru tidak termasuk garansi.</p>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-heading"><div className="eyebrow">CERITA PENGGUNA</div><h2>Yang paling penting: benar-benar membantu.</h2></div>
            <div className="testimonial-grid">
              {testimonials.map((t:any)=><blockquote className="testimonial" key={t.id}><p>“{t.quote}”</p><footer><strong>{t.name}</strong><span>{[t.role,t.company].filter(Boolean).join(" · ")}</span></footer></blockquote>)}
            </div>
          </div>
        </section>
      )}

      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div className="faq-intro"><div className="eyebrow">FAQ</div><h2>Sebelum mulai, mungkin ini yang ingin ditanyakan.</h2><p>Semua FAQ di bagian ini dapat ditambah, diubah, diurutkan, disembunyikan, dan dihapus lewat admin.</p></div>
          <div className="faq-list">
            {(faqs.length ? faqs : [
              {id:-1,question:"Apakah bisa request desain?",answer:"Bisa. Untuk jasa custom, kebutuhan visual dibahas pada tahap brief."},
              {id:-2,question:"Berapa lama pengerjaannya?",answer:"Landing Page 2–4 hari kerja, Dashboard 4–7 hari kerja, dan Web Custom maksimal 7 hari kerja setelah brief, bahan, dan DP lengkap."},
              {id:-3,question:"Apa yang termasuk garansi?",answer:"Bug/error pada fitur yang sudah termasuk dalam scope awal. Penambahan fitur atau perubahan scope baru berada di luar garansi."},
            ]).map((f:any)=><details key={f.id}><summary>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="section final-cta section-dark" id="konsultasi">
        <div className="flow flow-c" />
        <div className="container final-cta-inner">
          <div><div className="eyebrow light">MULAI DARI CERITA</div><h2>Ada ide? Ceritakan saja dulu.</h2><p>Tidak harus tahu teknologi apa yang dibutuhkan. Jelaskan masalah atau idenya, kami bantu memikirkan langkah berikutnya.</p></div>
          <div className="cta-buttons">
            <WhatsAppLink number={contact.whatsapp || ""} message="Halo Teman Digital, saya punya ide/kebutuhan digital dan ingin konsultasi." label="Konsultasi via WhatsApp" subject="Final CTA" className="button button-light"/>
            <a href="#produk" className="button button-ghost-light">Lihat Produk</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand"><strong>Teman Digital</strong><p>{settings.brand?.tagline}</p><small>{settings.footer?.note}</small></div>
          <div><strong>Produk</strong>{products.slice(0,5).map((p:any)=><Link href={`/produk/${p.slug}`} key={p.slug}>{p.name}</Link>)}</div>
          <div><strong>Layanan</strong>{services.map((s:any)=><a href="#jasa" key={s.slug}>{s.name}</a>)}</div>
          <div><strong>Bantuan</strong><a href="#faq">FAQ</a><a href="/portfolio">Portfolio</a><a href={`mailto:${contact.email || "temandigital26@gmail.com"}`}>Email</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Teman Digital</span><span>Bangun Lebih Baik. Tumbuh Lebih Cepat.</span></div>
      </footer>
    </main>
  );
}
