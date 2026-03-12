import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
