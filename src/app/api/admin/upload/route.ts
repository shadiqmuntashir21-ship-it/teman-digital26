import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg","image/png","image/webp","image/avif","image/gif"]);
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req:Request){
  const session = await getSession();
  if(!session) return NextResponse.json({message:"Unauthorized"},{status:401});

  const form = await req.formData();
  const file = form.get("file");
  if(!(file instanceof File)) return NextResponse.json({message:"File tidak ditemukan."},{status:400});
  if(!ALLOWED.has(file.type)) return NextResponse.json({message:"Format gambar harus JPG, PNG, WEBP, AVIF, atau GIF."},{status:400});
  if(file.size > MAX_BYTES) return NextResponse.json({message:"Ukuran gambar maksimal 4 MB."},{status:400});

  const safe = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g,"-").replace(/^-+|-+$/g,"") || "media";
  const blob = await put("teman-digital/"+Date.now()+"-"+safe, file, {
    access:"public",
    addRandomSuffix:true,
    contentType:file.type,
  });
  return NextResponse.json({ok:true,url:blob.url,pathname:blob.pathname});
}
