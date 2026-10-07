"use client";
import { useEffect } from "react";

export function MotionEnhancer(){
  useEffect(()=>{
    const root=document.documentElement;
    root.classList.add("motion-ready");
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      root.classList.add("reduce-motion");
      return;
    }
    const selector="main section, .product-showcase-item, .portfolio-showcase-item, .portfolio-page-feature, .service-row, .process-step, .admin-panel, .admin-stat-grid > div";
    const nodes=Array.from(document.querySelectorAll<HTMLElement>(selector));
    nodes.forEach((el,i)=>{
      el.classList.add("reveal-motion");
      el.style.setProperty("--reveal-delay",`${Math.min(i%5,4)*55}ms`);
    });
    const io=new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          (entry.target as HTMLElement).classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:"0px 0px -6% 0px"});
    nodes.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);
  return null;
}
