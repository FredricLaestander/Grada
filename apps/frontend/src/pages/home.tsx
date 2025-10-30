import { useQuery } from '@tanstack/react-query'
import { CourseCard } from '../components/courseCard'
import { Header } from '../components/header'
import { getCourses } from '../lib/request'

export const Home = () => {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  })

  return (
    <div className="flex flex-col gap-20">
      <Header />

      {data?.map((course) => (
        <CourseCard
          key={course.id}
          title={course.name}
          description={course.description || ''}
        />
      ))}

      {!data && <p>No data found</p>}
    </div>
  )
}
