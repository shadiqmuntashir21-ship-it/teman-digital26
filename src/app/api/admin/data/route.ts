import { NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { getDb } from "@/db/client";
import { emailOrderStatus } from "@/lib/email";
import {
  auditLogs, faqs, homepageSections, leads, orders, paymentMethods, portfolios,
  products, services, siteSettings, testimonials
} from "@/db/schema";

type AnyRow = Record<string, unknown>;
const map:any={products,services,portfolios,testimonials,faqs,paymentMethods,homepageSections,orders};

function sanitize(entity:string,data:any){
  const copy={...data};
  delete copy.id; delete copy.createdAt; delete copy.updatedAt;
  const jsonFields:Record<string,string[]>={
    products:["gallery","features","audience","faq","seo"],
    portfolios:["gallery","technologies"],
    homepageSections:["config"],
  };
  for(const k of jsonFields[entity]||[]){
    if(typeof copy[k]==="string"){
      try{ copy[k]=JSON.parse(copy[k]); }catch{ copy[k]=k==="seo"||k==="config"?{}:[]; }
    }
  }
  const bools=["published","featured","checkoutEnabled","enabled"];
  for(const k of bools) if(k in copy) copy[k]=Boolean(copy[k]);
  const ints=["sortOrder","productId","paymentMethodId"];
  for(const k of ints) if(copy[k]!==undefined&&copy[k]!==null&&copy[k]!=="") copy[k]=Number(copy[k]);
  return copy;
}

function labelFor(entity:string,row:any){
  return String(row?.name||row?.title||row?.question||row?.code||row?.sectionKey||row?.key||entity);
}

async function writeAudit(db:any,input:{
  adminEmail:string;
  entity:string;
  action:string;
  entityId?:number|null;
  summary?:string;
  before?:any;
  after?:any;
}){
  try{
    await db.insert(auditLogs).values({
      adminEmail:input.adminEmail,
      entity:input.entity,
      action:input.action,
      entityId:input.entityId ?? null,
      summary:input.summary || null,
      before:input.before ?? null,
      after:input.after ?? null,
    });
  }catch{
    // Audit logging must never block the admin action itself.
  }
}

export async function GET(){
  const session=await getSession();
  if(!session) return NextResponse.json({message:"Unauthorized"},{status:401});
  const db=getDb();
  if(!db) return NextResponse.json({message:"DATABASE_URL belum dikonfigurasi."},{status:503});
  const [p,s,po,t,f,pm,hs,o,l,st,audits]=await Promise.all([
    db.select().from(products).orderBy(asc(products.sortOrder)),
    db.select().from(services).orderBy(asc(services.sortOrder)),
    db.select().from(portfolios).orderBy(asc(portfolios.sortOrder)),
    db.select().from(testimonials).orderBy(asc(testimonials.sortOrder)),
    db.select().from(faqs).orderBy(asc(faqs.sortOrder)),
    db.select().from(paymentMethods).orderBy(asc(paymentMethods.sortOrder)),
    db.select().from(homepageSections).orderBy(asc(homepageSections.sortOrder)),
    db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100),
    db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100),
    db.select().from(siteSettings),
    db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(200)
  ]);
  return NextResponse.json({
    products:p,services:s,portfolios:po,testimonials:t,faqs:f,paymentMethods:pm,
    homepageSections:hs,orders:o,leads:l,auditLogs:audits,
    settings:Object.fromEntries(st.map(x=>[x.key,x.value]))
  });
}

export async function POST(req:Request){
  const session=await getSession();
  if(!session) return NextResponse.json({message:"Unauthorized"},{status:401});
  const db=getDb();
  if(!db) return NextResponse.json({message:"DATABASE_URL belum dikonfigurasi."},{status:503});
  const body=await req.json();
  const entity=String(body.entity||"");
  const action=String(body.action||"");

  if(entity==="settings"){
    const key=String(body.key||"");
    if(!key) return NextResponse.json({message:"Key wajib."},{status:400});
    const value=typeof body.data==="object"?body.data:{};
    const [beforeRow]=await db.select().from(siteSettings).where(eq(siteSettings.key,key)).limit(1);
    await db.insert(siteSettings).values({key,value}).onConflictDoUpdate({
      target:siteSettings.key,
      set:{value,updatedAt:new Date()}
    });
    await writeAudit(db,{
      adminEmail:session.email,
      entity:"settings",
      action:"update",
      entityId:beforeRow?.id ?? null,
      summary:`Pengaturan ${key}`,
      before:beforeRow?.value ?? null,
      after:value,
    });
    return NextResponse.json({ok:true});
  }

  const table=map[entity];
  if(!table) return NextResponse.json({message:"Entitas tidak dikenal."},{status:400});

  if(action==="create"){
    const data=sanitize(entity,body.data||{});
    const created = await db.insert(table).values(data).returning() as unknown as AnyRow[];
    const row:any=created[0];
    await writeAudit(db,{
      adminEmail:session.email,
      entity,
      action:"create",
      entityId:Number(row?.id)||null,
      summary:`Tambah ${labelFor(entity,row)}`,
      before:null,
      after:row,
    });
    return NextResponse.json({ok:true,row});
  }

  if(action==="update"){
    const id=Number(body.id);
    const data=sanitize(entity,body.data||{});
    const [beforeRow]=await db.select().from(table).where(eq(table.id,id)).limit(1) as any[];
    if(!beforeRow) return NextResponse.json({message:"Data tidak ditemukan."},{status:404});

    if(entity==="orders") data.updatedAt=new Date();
    if(entity==="products"||entity==="portfolios") data.updatedAt=new Date();

    const updated = await db.update(table).set(data).where(eq(table.id,id)).returning() as unknown as AnyRow[];
    const row:any=updated[0];

    await writeAudit(db,{
      adminEmail:session.email,
      entity,
      action:"update",
      entityId:id,
      summary:`Ubah ${labelFor(entity,row)}`,
      before:beforeRow,
      after:row,
    });

    if(entity==="orders" && row?.status && row.status!==beforeRow.status){
      void emailOrderStatus({
        code:String(row.code),
        customerEmail:String(row.customerEmail),
        customerName:String(row.customerName),
        productName:String((row.productSnapshot as any)?.name || "Produk Teman Digital"),
        status:String(row.status),
        accessToken:String(row.accessToken),
      });
    }

    return NextResponse.json({ok:true,row});
  }

  if(action==="delete"){
    const id=Number(body.id);
    if(entity==="orders") return NextResponse.json({message:"Pesanan tidak dihapus; ubah statusnya untuk menjaga audit."},{status:400});
    const [beforeRow]=await db.select().from(table).where(eq(table.id,id)).limit(1) as any[];
    if(!beforeRow) return NextResponse.json({message:"Data tidak ditemukan."},{status:404});
    await db.delete(table).where(eq(table.id,id));
    await writeAudit(db,{
      adminEmail:session.email,
      entity,
      action:"delete",
      entityId:id,
      summary:`Hapus ${labelFor(entity,beforeRow)}`,
      before:beforeRow,
      after:null,
    });
    return NextResponse.json({ok:true});
  }

  return NextResponse.json({message:"Aksi tidak dikenal."},{status:400});
}
