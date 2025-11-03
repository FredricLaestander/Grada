import { useQuery } from '@tanstack/react-query'
import { CourseCard } from '../components/courseCard'
import { getCourses } from '../lib/request'

export const Courses = () => {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 pt-28">
      {!data ? (
        <p>No courses available</p>
      ) : (
        data.map((course) => (
          <CourseCard
            key={course.id}
            title={course.name}
            description={course.description || ''}
            tags={course.tags}
            id={course.id}
          />
        ))
      )}
    </div>
  )
}
