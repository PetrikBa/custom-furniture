import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Neplatné dáta" }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;

  const { error } = await resend.emails.send({
    from: "web@custom-furniture.sk",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `Nový dopyt od ${name}`,
    text: `
Meno: ${name}
E-mail: ${email}
Telefón: ${phone ?? "—"}

Správa:
${message}
    `.trim(),
  });

  if (error) {
    return NextResponse.json({ error: "Chyba pri odosielaní" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
