"use client";

import { useEffect, useMemo } from "react";

export function WhatsAppLink({
  number,
  message,
  label,
  subject,
  className = "button button-primary",
}: {
  number:string;
  message:string;
  label:string;
  subject?:string;
  className?:string;
}) {
  const href = useMemo(() => {
    const digits = (number || "").replace(/\D/g, "").replace(/^0/, "62");
    return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : "#";
  }, [number, message]);

  async function track() {
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: window.location.pathname,
          source: document.referrer || "direct",
          cta: label,
          subject: subject || "Konsultasi",
          utm: Object.fromEntries(new URLSearchParams(window.location.search)),
        }),
      });
    } catch {}
  }

  useEffect(() => {}, []);

  return <a className={className} href={href} target="_blank" rel="noreferrer" onClick={track}>{label}</a>;
}
