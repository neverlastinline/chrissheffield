import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Middleware also enforces this, but verify on the server as a defense in depth.
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <>{children}</>;
}
