import { NextResponse } from "next/server";
import { getDb } from "@/db/client";
import { leads } from "@/db/schema";

export async function POST(req:Request){
  const db=getDb();
  if(!db) return NextResponse.json({ok:true});
  try{
    const body=await req.json();
    await db.insert(leads).values({
      source:String(body.source||"").slice(0,120),
      page:String(body.page||"").slice(0,1000),
      cta:String(body.cta||"").slice(0,120),
      subject:String(body.subject||"").slice(0,160),
      utm: typeof body.utm==="object" ? body.utm : {},
    });
  }catch{}
  return NextResponse.json({ok:true});
}
