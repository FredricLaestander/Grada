import { X } from 'lucide-react'
import { Button } from '../components/button'

export const Home = () => {
  return (
    <div>
      <Button
        icon={X}
        variant="secondary"
        as="button"
        onClick={() => console.log('boom')}
      >
        Button
      </Button>
      <Button as="a" href="https://laestander.com">
        2
      </Button>
    </div>
  )
}
