import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SiteFooter } from '../../../components/site-footer'
import { SiteHeader } from '../../../components/site-header'
import { courseDetailCopy, courses, getCourse, siteConfig } from '../../../lib/site-config'

export function generateStaticParams() {
  return courses.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourse(slug)

  return { title: course ? `${course.title} | ${siteConfig.name}` : `Course | ${siteConfig.name}` }
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = getCourse(slug)

  if (!course) notFound()

  const otherCourses = courses.filter(({ slug: otherSlug }) => otherSlug !== course.slug).slice(0, 3)

  return (
    <>
    <SiteHeader />
    <main className="course-detail-page">
      <Link href="/#courses" className="inner-back"><ArrowLeft /> Back to courses</Link>
      <section className="course-detail-hero">
        <div className="course-detail-copy">
          <p className="eyebrow">{course.category} course <span>·</span> {siteConfig.location}</p>
          <h1>{course.title}</h1>
          <p className="section-label">Website introduction</p>
          <p className="course-detail-intro">{course.description}</p>
          {course.duration && <p className="course-duration course-detail-duration">Duration: {course.duration}</p>}
          <Link href="/contact" className="button button-dark">Enquire about this course <ArrowRight /></Link>
        </div>
        <div className="course-detail-image"><img src={course.image} alt={course.imageAlt ?? `${course.title} course`} /></div>
      </section>

      <section className="course-detail-overview">
        <div>
          <p className="section-label">Course overview</p>
          <h2>Build your skills with <em>guided practice.</em></h2>
        </div>
        <div className="course-overview-card">
          <p>{course.description}</p>
          <p>{courseDetailCopy}</p>
          <Link href="/contact" className="text-link">Ask about admissions <ArrowRight /></Link>
        </div>
      </section>

      <section className="course-curriculum">
        {course.curriculum.length > 0 ? <>
        <p className="section-label">Full curriculum</p>
        <h2>What you will <em>study.</em></h2>
        <div className="curriculum-grid">
          {course.curriculum.map((section) => (
            <section className="curriculum-module" key={section.heading}>
              <h3>{section.heading}</h3>
              {section.topics.length > 0 ? (
                <ul>{section.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              ) : <p className="curriculum-note">{section.note}</p>}
            </section>
          ))}
        </div>
        </> : <p className="curriculum-note">Please contact the academy for the detailed curriculum of this course.</p>}
      </section>

      <section className="related-courses">
        <div className="section-heading">
          <div><p className="section-label">Keep exploring</p><h2>Other <em>courses.</em></h2></div>
          <Link href="/#courses" className="text-link">All courses <ArrowRight /></Link>
        </div>
        <div className="course-grid">
          {otherCourses.map((otherCourse) => (
            <Link href={`/courses/${otherCourse.slug}`} className="course-card" key={otherCourse.slug}>
              <div className="course-image"><img src={otherCourse.image} alt={otherCourse.imageAlt ?? `${otherCourse.title} course`} /></div>
              <p className="card-tag">{otherCourse.category}</p>
              <h3>{otherCourse.title}</h3>
              {otherCourse.duration && <p className="course-duration">Duration: {otherCourse.duration}</p>}
              <span className="course-card-action">View course <ArrowRight /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
    <SiteFooter />
    </>
  )
}
