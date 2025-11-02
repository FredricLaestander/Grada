import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../lib/request'
import { LessonCard } from '../components/lessonCard'
import { Header } from '../components/header'
import { useParams } from 'react-router'

export const Course = () => {
  const { id } = useParams()

  const { data } = useQuery({
    queryKey: ['course'],
    queryFn: () => getCourseById(id!),
  })

  return (
    <>
      <Header />

      <main className="flex w-full flex-col gap-6 px-4 pt-28">
        {!data ? (
          <p>No courses available</p>
        ) : (
          data.lessons?.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              // state="active"
              title={lesson.name}
            />
          ))
        )}
      </main>
    </>
  )
}
