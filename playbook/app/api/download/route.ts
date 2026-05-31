import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getPaidSession } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  // Re-verify payment server-side before handing over the file.
  const session = await getPaidSession(sessionId);
  if (!session) {
    return NextResponse.json(
      { error: "Payment required. No valid paid session found." },
      { status: 403 }
    );
  }

  // The PDF lives outside /public so it can't be fetched without paying.
  const filePath = path.join(process.cwd(), "content", "guide.pdf");
  try {
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="the-ai-coding-playbook.pdf"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Guide file not found on server." },
      { status: 500 }
    );
  }
}
