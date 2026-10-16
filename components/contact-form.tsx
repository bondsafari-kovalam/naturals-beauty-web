'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'

export function ContactForm() {
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const text = [
      'Website enquiry — Naturals Beauty Academy',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      '',
      'Message:',
      data.get('message'),
    ].join('\n')
    const chatUrl = `https://wa.me/918929660506?text=${encodeURIComponent(text)}`
    const chatWindow = window.open(chatUrl, '_blank')
    if (chatWindow) chatWindow.opener = null
    else window.location.href = chatUrl
    setMessage('WhatsApp opened with your message. Tap Send in WhatsApp to deliver it.')
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-form-fields"><label>Your name<input name="name" autoComplete="name" placeholder="Enter your name" required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div>
    <label>Phone number <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" /></label>
    <label>Your message<textarea name="message" rows={5} placeholder="Tell us what you would like to know..." required /></label>
    <div className="contact-form-submit"><button type="submit" className="button button-dark">Continue to WhatsApp <ArrowRight /></button>{message && <p role="status" aria-live="polite">{message}</p>}</div>
  </form>
}
