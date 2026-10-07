"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader({ settings }: { settings:any }) {
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const brandName = settings?.brand?.name || "KARVA";
  const lightLogo = settings?.brand?.logoLightUrl || "/brand/karva-logo-light.png";

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>24);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const links=[
    {label:"Produk",href:"/#produk"},
    {label:"Karya",href:"/#karya"},
    {label:"Jasa",href:"/#jasa"},
  ];

  return (
    <header className={`site-header kv-site-header ${scrolled?"is-scrolled":""} ${open?"menu-open":""}`}>
      <div className="kv-nav-shell">
        <Link href="/" className="kv-brand" aria-label={brandName} onClick={()=>setOpen(false)}>
          <img src={lightLogo} alt={brandName}/>
        </Link>
        <nav className="kv-desktop-nav" aria-label="Navigasi utama">
          {links.map(item=><Link href={item.href} key={item.label}>{item.label}</Link>)}
        </nav>
        <div className="kv-nav-actions">
          <Link className="kv-nav-cta" href="/#project">Mulai Project <ArrowUpRight size={14}/></Link>
          <button className="kv-menu-button" type="button" aria-label={open?"Tutup menu":"Buka menu"} onClick={()=>setOpen(v=>!v)}>
            {open?<X size={20}/>:<Menu size={20}/>}
          </button>
        </div>
      </div>
      <div className="kv-mobile-menu">
        {links.map(item=><Link href={item.href} key={item.label} onClick={()=>setOpen(false)}>{item.label}<ArrowUpRight size={18}/></Link>)}
        <Link className="kv-mobile-project" href="/#project" onClick={()=>setOpen(false)}>Mulai Project <ArrowUpRight size={18}/></Link>
      </div>
    </header>
  );
}
