export const defaultSettings = {
  brand: {
    name: "Teman Digital",
    tagline: "Bangun Lebih Baik. Tumbuh Lebih Cepat.",
    logoUrl: "",
    primary: "#0F2747",
    blue: "#2563EB",
    cyan: "#38BDF8",
  },
  hero: {
    eyebrow: "PRODUK & SOLUSI DIGITAL",
    title: "Bikin digital jadi lebih mudah.",
    body: "Produk siap pakai dan solusi digital custom untuk membantu pekerjaan, bisnis, dan ide Anda tumbuh lebih cepat.",
    primaryLabel: "Jelajahi Produk",
    primaryHref: "#produk",
    secondaryLabel: "Konsultasi via WhatsApp",
  },
  contact: {
    whatsapp: "",
    email: "temandigital26@gmail.com",
    instagram: "",
    tiktok: "",
  },
  footer: {
    note: "Solusi digital yang rapi, modern, dan benar-benar bisa dipakai.",
  },
  seo: {
    title: "Teman Digital — Produk & Solusi Digital",
    description: "Produk digital siap pakai dan jasa pembuatan website, dashboard, dan web custom.",
  }
};

export const defaultProducts = [
  {
    id: -1, slug: "dailyn", name: "Dailyn", category: "Produktivitas",
    shortDescription: "Kelola aktivitas, kebiasaan, dan keuangan dalam satu tempat.",
    description: "Life operating system yang membantu hari terasa lebih terarah.",
    price: "39000", compareAtPrice: null, badge: "Siap Pakai", imageUrl: null,
    gallery: [], demoUrl: "", appUrl: "", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 1, features: ["Agenda & prioritas", "Habit tracker", "Pencatatan keuangan"],
    audience: ["Mahasiswa", "Pekerja", "Profesional"], faq: [], seo: {},
  },
  {
    id: -2, slug: "growva", name: "Growva", category: "Bisnis",
    shortDescription: "Produk digital untuk membantu bisnis bertumbuh lebih teratur.",
    description: "Solusi praktis untuk kebutuhan pengelolaan dan pertumbuhan bisnis.",
    price: "39000", compareAtPrice: null, badge: "Siap Pakai", imageUrl: null,
    gallery: [], demoUrl: "", appUrl: "", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 2, features: [], audience: [], faq: [], seo: {},
  },
  {
    id: -3, slug: "menuju-kita", name: "Menuju Kita", category: "Wedding",
    shortDescription: "Wedding planner digital yang rapi dari persiapan sampai hari bahagia.",
    description: "Ruang kerja digital untuk pasangan mengelola persiapan pernikahan dengan lebih tenang.",
    price: "49000", compareAtPrice: null, badge: "Premium", imageUrl: null,
    gallery: [], demoUrl: "", appUrl: "", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 3, features: [], audience: [], faq: [], seo: {},
  },
  {
    id: -4, slug: "kelaskita", name: "KelasKita", category: "Pendidikan",
    shortDescription: "Administrasi wali kelas yang tidak lagi berantakan.",
    description: "Satu aplikasi untuk membantu wali kelas mengelola data siswa dan administrasi kelas.",
    price: "99000", compareAtPrice: null, badge: "Pilihan Guru", imageUrl: null,
    gallery: [], demoUrl: "", appUrl: "", checkoutEnabled: true, featured: true,
    published: true, sortOrder: 4, features: [], audience: [], faq: [], seo: {},
  }
];

export const defaultServices = [
  { id:-1, slug:"landing-page", name:"Landing Page", description:"Halaman penjualan, promosi, atau profil yang fokus pada konversi.", startingPrice:"150000", duration:"2–4 hari kerja", revisions:"Maks. 5 revisi", warranty:"Garansi selamanya untuk bug/error pada fitur dalam scope awal.", features:["Responsif","SEO dasar","CTA terarah"], whatsappMessage:"Halo Teman Digital, saya ingin konsultasi pembuatan Landing Page.", published:true, sortOrder:1 },
  { id:-2, slug:"dashboard", name:"Dashboard", description:"Dashboard operasional, monitoring, analitik, atau administrasi sesuai kebutuhan.", startingPrice:"249000", duration:"4–7 hari kerja", revisions:"Maks. 5 revisi", warranty:"Garansi selamanya untuk bug/error pada fitur dalam scope awal.", features:["UI premium","Data terstruktur","Responsif"], whatsappMessage:"Halo Teman Digital, saya ingin konsultasi pembuatan Dashboard.", published:true, sortOrder:2 },
  { id:-3, slug:"web-custom", name:"Web Custom", description:"Aplikasi atau website custom yang dibangun mengikuti kebutuhan spesifik.", startingPrice:"399000", duration:"Maks. 7 hari kerja", revisions:"Maks. 10 revisi", warranty:"Garansi selamanya untuk bug/error pada fitur dalam scope awal.", features:["Scope fleksibel","Integrasi database","Siap dikembangkan"], whatsappMessage:"Halo Teman Digital, saya ingin konsultasi pembuatan Web Custom.", published:true, sortOrder:3 }
];
