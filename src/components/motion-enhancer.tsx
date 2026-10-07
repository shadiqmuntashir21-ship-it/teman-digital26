"use client";
import { useEffect } from "react";

export function MotionEnhancer(){
  useEffect(()=>{
    const root=document.documentElement;
    root.classList.add("motion-ready");
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced){
      root.classList.add("reduce-motion");
      return;
    }
    const selector=".kv-reveal, .portfolio-page-feature, .admin-panel, .admin-stat-grid > div";
    const nodes=Array.from(document.querySelectorAll<HTMLElement>(selector));
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          (entry.target as HTMLElement).classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:"0px 0px -7% 0px"});
    nodes.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);
  return null;
}
