export function rupiah(value: string | number | null | undefined) {
  const n = Number(value ?? 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function waLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "").replace(/^0/, "62");
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : "#";
}
