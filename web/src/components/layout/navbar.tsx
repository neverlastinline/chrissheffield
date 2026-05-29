import Link from "next/link";
import { Swords } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <Swords className="h-5 w-5 text-primary" />
          Footy Feud
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/cards">Cards</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/play">Play</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/leaderboard">Leaderboard</Link>
              </Button>
              <ThemeToggle />
              <UserMenu email={user.email ?? ""} />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign up</Link>
              </Button>
              <ThemeToggle />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
