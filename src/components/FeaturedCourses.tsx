import { Card } from './ui/Card'
import { useAppStore } from '../store/useAppStore'
import { COURSES } from '../constants/courses'

export const FeaturedCourses: React.FC = () => {
  const { openRegisterModal } = useAppStore()

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-blue font-sans max-w-xl mx-auto leading-tight">
            Our Featured Course at Smart Academy
          </h2>
          <p className="text-slate-400 mt-3 font-body text-sm max-w-md mx-auto">
            Choose from a wide variety of hands-on lessons designed to teach kids practical life and
            academic skills.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {COURSES.map((course, index) => (
            <Card
              key={index}
              variant="course"
              title={course.title}
              image={course.image}
              onClick={openRegisterModal}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
