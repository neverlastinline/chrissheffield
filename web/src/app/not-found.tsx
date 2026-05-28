import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 text-center space-y-6">
      <h1 className="text-7xl font-black tracking-tighter">404</h1>
      <p className="text-lg text-muted-foreground">
        Out of bounds — the page you&apos;re after doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
