import { NextResponse } from 'next/server'

const recipient = 'om@naturalsbeautyacademypro.com'

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please submit the form again.' }, { status: 400 })
  }

  // Silently accept honeypot submissions without sending email.
  if (clean(payload.website, 200)) return NextResponse.json({ ok: true })

  const name = clean(payload.name, 120)
  const email = clean(payload.email, 254)
  const phone = clean(payload.phone, 40)
  const message = clean(payload.message, 5000)

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter your name, a valid email and a message.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) {
    return NextResponse.json({ error: 'The contact email service is not configured yet. Please email us directly at om@naturalsbeautyacademypro.com.' }, { status: 503 })
  }

  const text = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || 'Not provided'}`, '', 'Message:', message].join('\n')
  let response: Response
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Website enquiry from ${name}`,
        text,
      }),
    })
  } catch {
    return NextResponse.json({ error: 'We could not reach the email service. Please try again later.' }, { status: 502 })
  }

  if (!response.ok) {
    return NextResponse.json({ error: 'We could not send your message right now. Please email us directly at om@naturalsbeautyacademypro.com.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
