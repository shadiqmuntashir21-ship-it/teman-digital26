import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminConsole } from "@/components/admin-console";

export const dynamic="force-dynamic";

export default async function AdminPage(){
  const session=await getSession();
  if(!session) redirect("/admin/login");
  return <AdminConsole session={session}/>;
}
