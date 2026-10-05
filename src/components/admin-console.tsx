"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Eye, LayoutDashboard, LogOut, Pencil, Plus, RefreshCw, Save, Search, Trash2, X } from "lucide-react";

type AnyRow=Record<string,any>;
type Field={key:string;label:string;type?:"text"|"textarea"|"number"|"boolean"|"url"|"media"|"select"|"lines"|"json";options?:string[];hint?:string};

const configs:Record<string,{label:string;singular:string;fields:Field[];readOnly?:boolean}>={
  products:{label:"Produk",singular:"Produk",fields:[
    {key:"name",label:"Nama Produk"},{key:"slug",label:"Slug / URL"},{key:"category",label:"Kategori"},
    {key:"shortDescription",label:"Deskripsi singkat",type:"textarea"},{key:"description",label:"Deskripsi lengkap",type:"textarea"},
    {key:"price",label:"Harga",type:"number"},{key:"compareAtPrice",label:"Harga coret",type:"number"},{key:"badge",label:"Badge"},
    {key:"imageUrl",label:"Gambar utama",type:"media"},{key:"gallery",label:"Gallery URL (satu per baris)",type:"lines"},
    {key:"demoUrl",label:"Link Demo",type:"url"},{key:"appUrl",label:"Link Aplikasi",type:"url"},
    {key:"features",label:"Fitur (satu per baris)",type:"lines"},{key:"audience",label:"Untuk siapa (satu per baris)",type:"lines"},
    {key:"checkoutEnabled",label:"Checkout aktif",type:"boolean"},{key:"featured",label:"Produk unggulan",type:"boolean"},
    {key:"published",label:"Tampilkan di website",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"},
    {key:"faq",label:"FAQ produk (JSON)",type:"json"},{key:"seo",label:"SEO (JSON)",type:"json"},
  ]},
  services:{label:"Jasa",singular:"Jasa",fields:[
    {key:"name",label:"Nama Jasa"},{key:"slug",label:"Slug"},{key:"description",label:"Deskripsi",type:"textarea"},
    {key:"startingPrice",label:"Harga mulai",type:"number"},{key:"duration",label:"Estimasi pengerjaan"},{key:"revisions",label:"Batas revisi"},
    {key:"warranty",label:"Garansi",type:"textarea"},{key:"features",label:"Fitur / cakupan (satu per baris)",type:"lines"},
    {key:"whatsappMessage",label:"Pesan WhatsApp otomatis",type:"textarea"},{key:"published",label:"Tampilkan",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"}
  ]},
  portfolios:{label:"Portfolio",singular:"Project",fields:[
    {key:"title",label:"Nama Project"},{key:"slug",label:"Slug"},{key:"category",label:"Kategori"},
    {key:"summary",label:"Ringkasan",type:"textarea"},{key:"challenge",label:"Masalah / challenge",type:"textarea"},
    {key:"solution",label:"Solusi",type:"textarea"},{key:"result",label:"Hasil",type:"textarea"},
    {key:"coverUrl",label:"Cover / screenshot",type:"media"},{key:"gallery",label:"Gallery URL (satu per baris)",type:"lines"},
    {key:"previewUrl",label:"URL Preview / Live Web",type:"url",hint:"Tombol Preview Web akan memakai link ini."},
    {key:"sourceUrl",label:"Link tambahan / GitHub",type:"url"},{key:"technologies",label:"Teknologi (satu per baris)",type:"lines"},
    {key:"featured",label:"Tampilkan sebagai featured",type:"boolean"},{key:"published",label:"Tampilkan di website",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"}
  ]},
  testimonials:{label:"Testimoni",singular:"Testimoni",fields:[
    {key:"name",label:"Nama"},{key:"role",label:"Peran"},{key:"company",label:"Perusahaan/instansi"},{key:"quote",label:"Testimoni",type:"textarea"},
    {key:"avatarUrl",label:"Foto",type:"media"},{key:"productOrService",label:"Produk/Jasa"},{key:"published",label:"Tampilkan",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"}
  ]},
  faqs:{label:"FAQ",singular:"FAQ",fields:[
    {key:"question",label:"Pertanyaan",type:"textarea"},{key:"answer",label:"Jawaban",type:"textarea"},{key:"category",label:"Kategori"},
    {key:"published",label:"Tampilkan",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"}
  ]},
  paymentMethods:{label:"Pembayaran",singular:"Metode Pembayaran",fields:[
    {key:"name",label:"Nama metode"},{key:"type",label:"Tipe",type:"select",options:["transfer","ewallet","qris","lainnya"]},
    {key:"accountName",label:"Atas nama"},{key:"accountNumber",label:"Nomor rekening/akun"},{key:"instructions",label:"Instruksi",type:"textarea"},
    {key:"logoUrl",label:"Logo",type:"media"},{key:"enabled",label:"Aktif",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"}
  ]},
  homepageSections:{label:"Section Homepage",singular:"Section",fields:[
    {key:"sectionKey",label:"Key section"},{key:"eyebrow",label:"Eyebrow"},{key:"title",label:"Judul"},{key:"body",label:"Isi",type:"textarea"},
    {key:"enabled",label:"Aktif",type:"boolean"},{key:"sortOrder",label:"Urutan",type:"number"},{key:"config",label:"Konfigurasi tambahan (JSON)",type:"json"}
  ]},
  orders:{label:"Pesanan",singular:"Pesanan",fields:[
    {key:"code",label:"Kode",type:"text"},{key:"customerName",label:"Nama pelanggan"},{key:"customerEmail",label:"Email"},
    {key:"customerWhatsapp",label:"WhatsApp"},{key:"amount",label:"Nominal",type:"number"},
    {key:"paymentProofUrl",label:"Bukti bayar URL",type:"url"},
    {key:"status",label:"Status",type:"select",options:["MENUNGGU_PEMBAYARAN","MENUNGGU_VERIFIKASI","LUNAS","DIPROSES","SELESAI","DIBATALKAN"]},
    {key:"notes",label:"Catatan admin",type:"textarea"}
  ]},
  leads:{label:"Leads WhatsApp",singular:"Lead",fields:[],readOnly:true}
};

const settingFields:Record<string,Field[]>={
  brand:[{key:"name",label:"Nama brand"},{key:"tagline",label:"Tagline"},{key:"logoUrl",label:"Logo resmi",type:"media"},{key:"primary",label:"Navy"},{key:"blue",label:"Blue"},{key:"cyan",label:"Cyan"}],
  hero:[{key:"eyebrow",label:"Eyebrow"},{key:"title",label:"Headline"},{key:"body",label:"Subheadline",type:"textarea"},{key:"primaryLabel",label:"Label tombol utama"},{key:"primaryHref",label:"Link tombol utama"},{key:"secondaryLabel",label:"Label tombol WhatsApp"}],
  navigation:[{key:"links",label:"Menu navigasi (JSON)",type:"json",hint:"Format: [{\"label\":\"Produk\",\"href\":\"/#produk\"}]"},{key:"ctaLabel",label:"Label tombol CTA"},{key:"ctaHref",label:"Link tombol CTA"},{key:"announcementEnabled",label:"Tampilkan pengumuman",type:"boolean"},{key:"announcementText",label:"Teks pengumuman"},{key:"announcementHref",label:"Link pengumuman"}],
  trust:[{key:"title",label:"Teks trust strip"},{key:"tags",label:"Tag kategori (satu per baris)",type:"lines"}],
  process:[{key:"steps",label:"Langkah cara kerja (JSON)",type:"json",hint:"Format: [{\"title\":\"Ceritakan\",\"description\":\"...\"}]"}],
  commerce:[{key:"proofProduct",label:"Micro-proof produk"},{key:"proofConsultation",label:"Micro-proof konsultasi"},{key:"proofWarranty",label:"Micro-proof garansi"}],
  contact:[{key:"whatsapp",label:"Nomor WhatsApp",hint:"Contoh: 62812..."},{key:"email",label:"Email"},{key:"instagram",label:"Instagram URL",type:"url"},{key:"tiktok",label:"TikTok URL",type:"url"}],
  footer:[{key:"note",label:"Catatan footer",type:"textarea"},{key:"copyright",label:"Teks copyright"},{key:"closingTagline",label:"Tagline penutup"},{key:"helpLinks",label:"Link bantuan footer (JSON)",type:"json"}],
  seo:[{key:"title",label:"SEO title"},{key:"description",label:"SEO description",type:"textarea"}],
};

function normalizeForForm(value:any,field:Field){
  if(field.type==="lines") return Array.isArray(value)?value.join("\n"):(value||"");
  if(field.type==="json") return typeof value==="string"?value:JSON.stringify(value??(field.key==="seo"||field.key==="config"?{}:[]),null,2);
  return value??(field.type==="boolean"?false:"");
}
function serialize(value:any,field:Field){
  if(field.type==="lines") return String(value||"").split("\n").map(x=>x.trim()).filter(Boolean);
  if(field.type==="json"){try{return JSON.parse(String(value||"{}"))}catch{return field.key==="seo"||field.key==="config"?{}:[]}}
  if(field.type==="number") return value===""?null:Number(value);
  if(field.type==="boolean") return Boolean(value);
  return value;
}

export function AdminConsole({session}:{session:{name:string;email:string}}){
  const [data,setData]=useState<any>(null);
  const [tab,setTab]=useState("overview");
  const [editing,setEditing]=useState<{entity:string;row:AnyRow|null}|null>(null);
  const [form,setForm]=useState<AnyRow>({});
  const [settingsKey,setSettingsKey]=useState("hero");
  const [settingsForm,setSettingsForm]=useState<AnyRow>({});
  const [search,setSearch]=useState("");
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState("");

  async function load(){
    setBusy(true);
    const r=await fetch("/api/admin/data",{cache:"no-store"});
    if(r.status===401){location.href="/admin/login";return}
    const d=await r.json(); setData(d); setBusy(false);
  }
  useEffect(()=>{load()},[]);
  useEffect(()=>{
    const base=data?.settings?.[settingsKey]||{};
    const result:AnyRow={};
    for(const f of settingFields[settingsKey]||[]) result[f.key]=normalizeForForm(base[f.key],f);
    setSettingsForm(result);
  },[data,settingsKey]);

  const rows=useMemo(()=>{
    const list=data?.[tab]||[];
    if(!search) return list;
    const q=search.toLowerCase();
    return list.filter((x:AnyRow)=>JSON.stringify(x).toLowerCase().includes(q));
  },[data,tab,search]);

  function openEditor(entity:string,row:AnyRow|null){
    const cfg=configs[entity]; const next:AnyRow={};
    for(const f of cfg.fields) next[f.key]=normalizeForForm(row?.[f.key],f);
    if(!row){
      for(const f of cfg.fields){
        if(f.type==="boolean") next[f.key]=f.key==="published"||f.key==="enabled"||f.key==="checkoutEnabled"||f.key==="featured"?true:false;
        if(f.key==="sortOrder") next[f.key]=(data?.[entity]?.length||0)+1;
      }
    }
    setForm(next); setEditing({entity,row});
  }

  async function saveEntity(){
    if(!editing) return;
    setBusy(true);
    const cfg=configs[editing.entity];
    const payload:AnyRow={};
    for(const f of cfg.fields) payload[f.key]=serialize(form[f.key],f);
    const r=await fetch("/api/admin/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
      entity:editing.entity,action:editing.row?"update":"create",id:editing.row?.id,data:payload
    })});
    const d=await r.json();
    setBusy(false);
    if(!r.ok){setNotice(d.message||"Gagal menyimpan.");return}
    setEditing(null); setNotice("Perubahan tersimpan."); await load();
  }

  async function remove(entity:string,id:number){
    if(!confirm("Hapus item ini?")) return;
    setBusy(true);
    const r=await fetch("/api/admin/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entity,action:"delete",id})});
    const d=await r.json(); setBusy(false);
    if(!r.ok){setNotice(d.message||"Gagal menghapus.");return}
    setNotice("Item dihapus."); await load();
  }

  async function saveSettings(){
    setBusy(true);
    const fields=settingFields[settingsKey]||[]; const out:AnyRow={};
    for(const f of fields) out[f.key]=serialize(settingsForm[f.key],f);
    const r=await fetch("/api/admin/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entity:"settings",key:settingsKey,data:out})});
    setBusy(false); if(r.ok){setNotice("Pengaturan website tersimpan.");await load()} else setNotice("Gagal menyimpan.");
  }

  async function logout(){await fetch("/api/admin/logout",{method:"POST"});location.href="/admin/login"}

  const menu=[["overview","Ringkasan"],["settings","Website & Brand"],["products","Produk"],["services","Jasa"],["portfolios","Portfolio"],["testimonials","Testimoni"],["faqs","FAQ"],["paymentMethods","Pembayaran"],["homepageSections","Section Homepage"],["orders","Pesanan"],["leads","Leads WhatsApp"]];

  if(!data) return <div className="admin-loading"><RefreshCw className="spin"/> Menyiapkan Control Center...</div>;

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand"><strong>Teman Digital</strong><span>CONTROL CENTER</span></div>
      <nav>{menu.map(([key,label])=><button key={key} onClick={()=>{setTab(key);setSearch("")}} className={tab===key?"active":""}>{key==="overview"&&<LayoutDashboard size={16}/>}<span>{label}</span></button>)}</nav>
      <div className="admin-sidebar-bottom"><span>{session.name}</span><small>{session.email}</small><button onClick={logout}><LogOut size={15}/> Keluar</button></div>
    </aside>

    <section className="admin-main">
      <header className="admin-topbar"><div><span className="admin-kicker">TEMAN DIGITAL</span><h1>{tab==="overview"?"Ringkasan":tab==="settings"?"Website & Brand":configs[tab]?.label}</h1></div><div className="admin-top-actions"><a className="admin-preview-button" href="/" target="_blank"><Eye size={16}/> Preview Website</a><button className="admin-icon-button" onClick={load}><RefreshCw size={16}/></button></div></header>
      {notice&&<div className="admin-notice" onClick={()=>setNotice("")}>{notice}<X size={14}/></div>}

      {tab==="overview"&&<div className="admin-overview">
        <div className="admin-stat-grid">
          <div><span>Produk</span><strong>{data.products.length}</strong><small>{data.products.filter((x:any)=>x.published).length} tampil</small></div>
          <div><span>Portfolio</span><strong>{data.portfolios.length}</strong><small>{data.portfolios.filter((x:any)=>x.published).length} tampil</small></div>
          <div><span>Pesanan</span><strong>{data.orders.length}</strong><small>{data.orders.filter((x:any)=>x.status==="MENUNGGU_VERIFIKASI").length} perlu verifikasi</small></div>
          <div><span>Leads WA</span><strong>{data.leads.length}</strong><small>100 aktivitas terbaru</small></div>
        </div>
        <div className="admin-panel"><div className="admin-panel-head"><div><span className="admin-kicker">PRINSIP CMS</span><h2>Semua yang sering berubah, jangan di-hard-code.</h2></div></div>
          <div className="admin-check-grid">{["Harga dan produk","Link demo & aplikasi","Portfolio & preview URL","Jasa dan estimasi","FAQ & testimoni","Metode pembayaran","Kontak & WhatsApp","Headline & brand","Status publish","Urutan tampilan","Status pesanan","SEO dasar"].map(x=><span key={x}>✓ {x}</span>)}</div>
        </div>
      </div>}

      {tab==="settings"&&<div className="admin-panel">
        <div className="settings-tabs">{Object.keys(settingFields).map(k=><button className={settingsKey===k?"active":""} onClick={()=>setSettingsKey(k)} key={k}>{k==="brand"?"Brand":k==="hero"?"Hero":k==="navigation"?"Navigasi":k==="trust"?"Trust Strip":k==="process"?"Cara Kerja":k==="commerce"?"Penjualan":k==="contact"?"Kontak":k==="footer"?"Footer":"SEO"}</button>)}</div>
        <div className="admin-form-grid">{settingFields[settingsKey].map(f=><FormField key={f.key} field={f} value={settingsForm[f.key]} onChange={v=>setSettingsForm(x=>({...x,[f.key]:v}))}/>)}</div>
        <div className="admin-form-actions"><button className="button" onClick={saveSettings} disabled={busy}><Save size={16}/> Simpan Pengaturan</button></div>
      </div>}

      {tab!=="overview"&&tab!=="settings"&&configs[tab]&&<div className="admin-panel">
        <div className="admin-panel-head">
          <div className="admin-search"><Search size={15}/><input placeholder={`Cari ${configs[tab].label.toLowerCase()}...`} value={search} onChange={e=>setSearch(e.target.value)}/></div>
          {!configs[tab].readOnly&&tab!=="orders"&&<button className="button" onClick={()=>openEditor(tab,null)}><Plus size={16}/> Tambah {configs[tab].singular}</button>}
        </div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Item</th><th>Detail</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>{rows.map((row:AnyRow)=><tr key={row.id}>
            <td><strong>{row.name||row.title||row.question||row.code||row.subject||row.sectionKey||"Item"}</strong><small>{row.slug||row.category||row.customerName||row.page||""}</small></td>
            <td><span>{row.price?Number(row.price).toLocaleString("id-ID"):""}{row.startingPrice?Number(row.startingPrice).toLocaleString("id-ID"):""}{row.summary||row.description||row.answer||row.customerEmail||row.source||""}</span></td>
            <td><Status row={row}/></td>
            <td><div className="admin-row-actions">
              {row.previewUrl&&<a href={row.previewUrl} target="_blank" rel="noreferrer" title="Preview web"><ExternalLink size={15}/></a>}
              {row.paymentProofUrl&&<a href={row.paymentProofUrl} target="_blank" rel="noreferrer" title="Lihat bukti pembayaran"><Eye size={15}/></a>}
              {!configs[tab].readOnly&&<button onClick={()=>openEditor(tab,row)} title="Edit"><Pencil size={15}/></button>}
              {!configs[tab].readOnly&&tab!=="orders"&&<button className="danger" onClick={()=>remove(tab,row.id)} title="Hapus"><Trash2 size={15}/></button>}
            </div></td>
          </tr>)}</tbody>
        </table>{rows.length===0&&<div className="admin-empty">Belum ada data di bagian ini.</div>}</div>
      </div>}
    </section>

    {editing&&<div className="admin-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setEditing(null)}}>
      <div className="admin-modal">
        <div className="admin-modal-head"><div><span className="admin-kicker">{editing.row?"EDIT":"TAMBAH"}</span><h2>{configs[editing.entity].singular}</h2></div><button onClick={()=>setEditing(null)}><X/></button></div>
        <div className="admin-form-grid">{configs[editing.entity].fields.map(f=><FormField key={f.key} field={f} value={form[f.key]} onChange={v=>setForm(x=>({...x,[f.key]:v}))}/>)}</div>
        <div className="admin-form-actions sticky"><button className="button button-secondary" onClick={()=>setEditing(null)}>Batal</button><button className="button" onClick={saveEntity} disabled={busy}><Save size={16}/>{busy?"Menyimpan...":"Simpan Perubahan"}</button></div>
      </div>
    </div>}
  </main>
}

function Status({row}:{row:AnyRow}){
  if(row.status) return <span className={`admin-status ${String(row.status).toLowerCase()}`}>{row.status.replaceAll("_"," ")}</span>;
  const on=row.published??row.enabled;
  if(on===undefined) return <span className="admin-status neutral">Tercatat</span>;
  return <span className={`admin-status ${on?"live":"off"}`}>{on?"Tampil":"Disembunyikan"}</span>
}

function FormField({field,value,onChange}:{field:Field;value:any;onChange:(v:any)=>void}){
  if(field.type==="boolean") return <label className="admin-toggle-field"><span><strong>{field.label}</strong>{field.hint&&<small>{field.hint}</small>}</span><input type="checkbox" checked={Boolean(value)} onChange={e=>onChange(e.target.checked)}/></label>;
  if(field.type==="media") return <MediaField field={field} value={value} onChange={onChange}/>;
  return <label className={field.type==="textarea"||field.type==="json"||field.type==="lines"?"full":""}><span>{field.label}</span>{field.hint&&<small>{field.hint}</small>}
    {field.type==="textarea"||field.type==="json"||field.type==="lines"?<textarea rows={field.type==="json"?7:4} value={value??""} onChange={e=>onChange(e.target.value)}/>:
     field.type==="select"?<select value={value??""} onChange={e=>onChange(e.target.value)}>{field.options?.map(o=><option key={o} value={o}>{o}</option>)}</select>:
     <input type={field.type==="number"?"number":field.type==="url"?"url":"text"} value={value??""} onChange={e=>onChange(e.target.value)}/>}
  </label>
}

function MediaField({field,value,onChange}:{field:Field;value:any;onChange:(v:any)=>void}){
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState("");

  async function upload(file:File){
    setUploading(true); setError("");
    const body=new FormData(); body.append("file",file);
    const r=await fetch("/api/admin/upload",{method:"POST",body});
    const data=await r.json();
    setUploading(false);
    if(!r.ok){setError(data.message||"Upload gagal.");return}
    onChange(data.url);
  }

  return <label className="full admin-media-field">
    <span>{field.label}</span>{field.hint&&<small>{field.hint}</small>}
    <div className="admin-media-row">
      {value?<img src={String(value)} alt="Preview media"/>:<div className="admin-media-empty">Belum ada gambar</div>}
      <div className="admin-media-controls">
        <input type="url" value={value??""} onChange={e=>onChange(e.target.value)} placeholder="Paste URL atau upload gambar"/>
        <label className="admin-upload-button">{uploading?"Mengunggah...":"Upload gambar"}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" disabled={uploading} onChange={e=>{const f=e.target.files?.[0];if(f)upload(f)}}/></label>
        {error&&<small className="admin-media-error">{error}</small>}
      </div>
    </div>
  </label>
}
