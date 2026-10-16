import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SiteFooter } from '../../components/site-footer'
import { SiteHeader } from '../../components/site-header'
import { coursePath, courses } from '../../lib/site-config'

export const metadata = {
  title: 'Courses | Naturals Beauty Academy',
  description: 'Explore beauty therapy, hair dressing, makeup artistry, cosmetology and nail art courses at Naturals Beauty Academy.',
}

export default function CoursesPage() {
  return (
    <>
      <SiteHeader />
      <main className="all-courses-page section">
        <p className="section-label">Naturals Beauty Academy · Alappuzha</p>
        <h1>Explore our <em>courses.</em></h1>
        <p className="all-courses-intro">Choose a course to view its introduction and full curriculum.</p>
        <div className="course-grid">
          {courses.map((course, index) => (
            <Link href={coursePath(course.slug)} className="course-card" key={course.slug} aria-label={`View details for ${course.title}`}>
              <div className="course-image">
                <img src={course.image} alt={course.imageAlt ?? `${course.title} course`} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="card-tag">{course.category}</p>
              <h3>{course.title}</h3>
              {course.duration && <p className="course-duration">Duration: {course.duration}</p>}
              <p>{course.description}</p>
              <span className="course-card-action">View course <ArrowRight /></span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
