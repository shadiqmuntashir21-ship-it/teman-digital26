export const defaultSettings = {
  brand: {
    name: "KARVA",
    tagline: "Ide diwujudkan. Nilai diciptakan.",
    logoUrl: "/brand/karva-logo-dark.png",
    logoLightUrl: "/brand/karva-logo-light.png",
    iconUrl: "/brand/karva-icon.png",
    primary: "#101828",
    blue: "#3157F6",
    cyan: "#39A8FF",
  },
  hero: {
    eyebrow: "KARVA · DIGITAL PRODUCT STUDIO",
    title: "Ide diwujudkan. Nilai diciptakan.",
    body: "Produk digital siap pakai dan solusi custom yang dibangun untuk kebutuhan nyata—rapi, modern, responsif, dan benar-benar bisa digunakan.",
    primaryLabel: "Jelajahi Produk",
    primaryHref: "#produk",
    secondaryLabel: "Konsultasi via WhatsApp",
  },
  navigation: {
    links: [
      { label: "Produk", href: "/#produk" },
      { label: "Jasa", href: "/jasa" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Cara Kerja", href: "/#cara-kerja" },
      { label: "FAQ", href: "/#faq" }
    ],
    ctaLabel: "Konsultasi Gratis",
    ctaHref: "/#konsultasi",
    announcementEnabled: false,
    announcementText: "",
    announcementHref: ""
  },
  trust: {
    title: "Dari ide sederhana menjadi produk digital yang siap dipakai.",
    tags: ["Produktivitas","Pendidikan","Wedding","Dashboard","Website","PWA"]
  },
  process: {
    steps: [
      { title: "Ceritakan", description: "Tidak perlu brief sempurna." },
      { title: "Kami pahami", description: "Masalah diterjemahkan menjadi solusi." },
      { title: "Kami bangun", description: "Desain dan development dikerjakan." },
      { title: "Anda review", description: "Revisi mengikuti paket yang dipilih." },
      { title: "Launch", description: "Produk siap digunakan." },
      { title: "Tetap ditemani", description: "Bug dalam scope tetap kami bantu." }
    ]
  },
  commerce: {
    proofProduct: "Produk mulai Rp39 ribu",
    proofConsultation: "Konsultasi tanpa biaya",
    proofWarranty: "Garansi bug sesuai scope"
  },
  servicesPage: {
    eyebrow: "JASA KARVA",
    title: "Solusi custom, tanpa dibuat rumit.",
    body: "Ceritakan kebutuhanmu. Kami bantu merancang solusi yang tepat dan tetap realistis untuk digunakan.",
    finalEyebrow: "BELUM TAHU PAKETNYA?",
    finalTitle: "Ceritakan masalahnya, bukan teknologinya.",
    finalButton: "Konsultasi Gratis",
    finalWhatsappMessage: "Halo KARVA, saya punya kebutuhan digital tapi belum tahu layanan yang cocok."
  },
  portfolioPage: {
    eyebrow: "PORTFOLIO",
    title: "Masalah nyata. Solusi yang benar-benar dipakai.",
    body: "Kami menampilkan project sebagai studi kasus—bukan sekadar galeri screenshot.",
    caseStudyLabel: "Lihat Studi Kasus",
    previewLabel: "Preview Web",
    extraLinkLabel: "Link tambahan",
    emptyTitle: "Portfolio akan tampil di sini.",
    emptyBody: "Admin dapat menambah project, screenshot, kategori, studi kasus, teknologi, dan link preview dari dashboard."
  },
  contact: {
    whatsapp: "",
    email: "temandigital26@gmail.com",
    instagram: "",
    tiktok: "",
  },
  footer: {
    note: "KARVA membangun produk digital dan solusi custom yang dirancang untuk benar-benar digunakan.",
    copyright: "© 2026 KARVA",
    closingTagline: "Ide diwujudkan. Nilai diciptakan.",
    helpLinks: [
      { label: "FAQ", href: "/#faq" },
      { label: "Portfolio", href: "/portfolio" }
    ]
  },
  seo: {
    title: "KARVA — Ide diwujudkan. Nilai diciptakan.",
    description: "KARVA adalah digital product studio untuk produk siap pakai, website, dashboard, dan solusi digital custom.",
  }
};

export const defaultProducts = [
  {
    id: -1, slug: "dailyn", name: "Dailyn", category: "Produktivitas",
    shortDescription: "Planner, habit, journal, finance, dan rutinitas harian dalam satu aplikasi.",
    description: "Life operating system yang membantu hidup lebih terarah setiap hari.",
    price: "39000", compareAtPrice: null, badge: "Siap Pakai",
    imageUrl: "/previews/dailyn.jpg",
    gallery: ["/previews/dailyn.jpg"],
    demoUrl: "https://dailyn.my.id", appUrl: "https://dailyn.my.id", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 1, features: ["Planner & agenda","Habit tracker","Journal","Catatan keuangan","PWA siap dipasang"],
    audience: ["Mahasiswa","Pekerja","Profesional"], faq: [], seo: {},
  },
  {
    id: -2, slug: "menuju-kita", name: "Menuju Kita", category: "Wedding Planner",
    shortDescription: "Checklist, budget, tamu, vendor, timeline, dokumen, sampai Hari-H dalam satu ruang.",
    description: "Wedding planner digital yang terasa personal untuk membantu pasangan menata semua detail menuju hari pernikahan.",
    price: "49000", compareAtPrice: null, badge: "Siap Pakai",
    imageUrl: "/previews/menuju-kita.jpg",
    gallery: ["/previews/menuju-kita.jpg"],
    demoUrl: "https://menujukitabersama.vercel.app", appUrl: "https://menujukitabersama.vercel.app", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 2, features: ["Checklist persiapan","Budget pernikahan","Manajemen tamu","Vendor","Timeline Hari-H","Dokumen"],
    audience: ["Pasangan yang sedang mempersiapkan pernikahan"], faq: [], seo: {},
  },
  {
    id: -3, slug: "kelaskita", name: "KelasKita", category: "Pendidikan",
    shortDescription: "Ruang kerja digital untuk mengelola kelas dan pembelajaran dengan lebih tenang.",
    description: "Satu aplikasi untuk wali kelas dan guru mata pelajaran mengelola siswa, kehadiran, nilai, remedial, catatan, administrasi, dan laporan.",
    price: "99000", compareAtPrice: null, badge: "Pilihan Guru",
    imageUrl: "/previews/kelaskita.jpg",
    gallery: ["/previews/kelaskita.jpg"],
    demoUrl: "https://kelaskita-bersama.vercel.app", appUrl: "https://kelaskita-bersama.vercel.app", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 3, features: ["Data siswa","Kehadiran","Nilai & remedial","Catatan siswa","Administrasi kelas","Laporan"],
    audience: ["Wali Kelas","Guru Mata Pelajaran","Guru yang merangkap Wali Kelas"], faq: [], seo: {},
  }
];

export const defaultServices = [
  { id:-1, slug:"landing-page", name:"Landing Page", description:"Halaman penjualan, promosi, atau profil yang fokus pada konversi.", startingPrice:"150000", duration:"2–4 hari kerja", revisions:"Maks. 5 revisi", warranty:"Garansi selamanya untuk bug/error pada fitur dalam scope awal.", features:["Responsif","SEO dasar","CTA terarah"], whatsappMessage:"Halo KARVA, saya ingin konsultasi pembuatan Landing Page.", published:true, sortOrder:1 },
  { id:-2, slug:"dashboard", name:"Dashboard", description:"Dashboard operasional, monitoring, analitik, atau administrasi sesuai kebutuhan.", startingPrice:"249000", duration:"4–7 hari kerja", revisions:"Maks. 5 revisi", warranty:"Garansi selamanya untuk bug/error pada fitur dalam scope awal.", features:["UI premium","Data terstruktur","Responsif"], whatsappMessage:"Halo KARVA, saya ingin konsultasi pembuatan Dashboard.", published:true, sortOrder:2 },
  { id:-3, slug:"web-custom", name:"Web Custom", description:"Aplikasi atau website custom yang dibangun mengikuti kebutuhan spesifik.", startingPrice:"399000", duration:"Maks. 7 hari kerja", revisions:"Maks. 10 revisi", warranty:"Garansi selamanya untuk bug/error pada fitur dalam scope awal.", features:["Scope fleksibel","Integrasi database","Siap dikembangkan"], whatsappMessage:"Halo KARVA, saya ingin konsultasi pembuatan Web Custom.", published:true, sortOrder:3 }
];
