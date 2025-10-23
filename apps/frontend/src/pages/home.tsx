import { Button } from '../components/button'
import { Logo } from '../components/logo'

export const Home = () => {
  return (
    <div>
      <Logo />
      <Button as="a" href="https://laestander.com">
        2
      </Button>
    </div>
  )
}
