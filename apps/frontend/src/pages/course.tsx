import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../lib/request'
import { LessonCard } from '../components/lessonCard'
import { Header } from '../components/header'

export const Course = () => {
  const { data } = useQuery({
    queryKey: ['lessons'],
    queryFn: getCourseById,
  })

  return (
    <div className="flex flex-col gap-6">
      <Header />

      {/* {!data ? (
        <p>No courses available</p>
      ) : (
        data.map((lesson) => <LessonCard />)
      )} */}
      <LessonCard state="active">Hej</LessonCard>
    </div>
  )
}
