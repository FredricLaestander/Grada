import { Elysia } from 'elysia'
import { authRouter } from './routes/auth'

const app = new Elysia()

app.use(authRouter)

app.listen(8000)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
)
