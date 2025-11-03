// Enums
export type Role = 'USER' | 'ADMIN' | 'DESIGNER'

export type ChapterType = 'TEXT' | 'QUESTION' | 'CODE'

// Core entities
export type User = {
  id: string
  username: string
  email: string
  roles: Role[]

  // relations (optional when not included/populated)
  courses?: UserCourse[]
  createdCourses?: Course[]

  createdAt: string
  updatedAt: string
}

export type Course = {
  id: string
  name: string
  description?: string | null
  tags: string[]

  userId: string
  createdBy?: User

  lessons?: Lesson[]
  users?: UserCourse[]

  createdAt: string
  updatedAt: string
}

export type UserCourse = {
  id: string
  userId: string
  courseId: string

  user?: User
  course?: Course

  lessonProgress?: Progress[]

  createdAt: string
  updatedAt: string
}

export type Lesson = {
  id: string
  name: string
  order: number

  courseId: string
  course?: Course

  chapters?: Chapter[]
  progress?: Progress[]

  createdAt: string
  updatedAt: string
}

export type Progress = {
  id: string
  donePercentage: number

  lessonId: string
  lesson?: Lesson
  userCourseId: string
  userCourse?: UserCourse
}

export type Chapter = {
  id: string
  order: number
  type: ChapterType

  // content relations (only one present depending on `type`)
  text?: TextChapter | null
  question?: QuestionChapter | null
  code?: CodeChapter | null

  lessonId: string
  lesson?: Lesson

  createdAt: string
  updatedAt: string
}

export type TextChapter = {
  id: string
  text: string

  chapterId: string
}

export type QuestionChapter = {
  id: string
  question: string
  alternatives: string[]
  correct: number

  chapterId: string
}

export type CodeChapter = {
  id: string
  text: string
  filename: string
  snippet: string
  answers: string[]

  chapterId: string
}

// Helper: Discriminated content union for a chapter with its concrete content present
export type ChapterWithContent =
  | (Chapter & {
      type: 'TEXT'
      text: TextChapter
      question?: null
      code?: null
    })
  | (Chapter & {
      type: 'QUESTION'
      question: QuestionChapter
      text?: null
      code?: null
    })
  | (Chapter & {
      type: 'CODE'
      code: CodeChapter
      text?: null
      question?: null
    })
