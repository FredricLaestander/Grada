import { Button } from '../components/button'
import { Header } from '../components/header'

export const Home = () => {
  return (
    <div className="flex gap-20">
      <Header />
      <Button as="a" href="/">
        hej
      </Button>
    </div>
  )
}
