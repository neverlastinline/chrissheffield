import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your Footy Feud account.",
};

export default function LoginPage() {
  return (
    <div className="container max-w-md py-16">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Log in to play and track your record.
        </p>
      </div>
      <LoginForm />
      <p className="mt-6 text-sm text-center text-muted-foreground">
        No account?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
