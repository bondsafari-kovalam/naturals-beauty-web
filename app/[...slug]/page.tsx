import Link from 'next/link'

const content: Record<string, { title: string; intro: string }> = {
  'the-academy': { title: 'The Academy', intro: 'A practical, creative learning environment for building confidence in beauty.' },
  courses: { title: 'Courses', intro: 'Explore practical learning paths across makeup, hair, skin and beauty.' },
  testimonials: { title: 'Testimonials', intro: 'Discover what learners value about a hands-on beauty education.' },
  workshops: { title: 'Workshops', intro: 'Focused sessions designed to help you explore new techniques.' },
  faq: { title: 'Frequently Asked Questions', intro: 'Find helpful answers about the academy and learning experience.' },
  contact: { title: 'Start a conversation', intro: 'Tell us what you would like to learn and our team will guide you.' },
  shop: { title: 'Shop', intro: 'The academy shop is coming soon.' },
}

export default async function InnerPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const key = slug[0]
  const page = content[key] ?? content.courses
  return <main className="inner-page"><Link href="/" className="inner-back">← Back home</Link><p className="eyebrow">NATURALS BEAUTY ACADEMY · ALAPPUZHA</p><h1>{page.title}</h1><p className="inner-intro">{page.intro}</p><div className="inner-card"><p>We are shaping thoughtful, practical beauty education for the next generation of professionals. This page is ready for the academy&apos;s approved course, workshop and contact content.</p><Link href="/contact" className="button button-dark">Enquire Now</Link></div></main>
}

export function generateStaticParams() { return Object.keys(content).map((slug) => ({ slug: [slug] })) }
