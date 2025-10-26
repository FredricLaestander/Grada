import { Elysia } from 'elysia'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'
import { courseRouter } from './routes/course'
import { cors } from '@elysiajs/cors'

const app = new Elysia().use(cors())

app.use(authRouter)
app.use(courseRouter)
app.use(userRouter)

app.listen(8000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
