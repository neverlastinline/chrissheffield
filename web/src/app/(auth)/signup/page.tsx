import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your Footy Feud account.",
};

export default function SignupPage() {
  return (
    <div className="container max-w-md py-16">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Start building your deck and ladder up.
        </p>
      </div>
      <SignupForm />
      <p className="mt-6 text-sm text-center text-muted-foreground">
        Already have one?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
