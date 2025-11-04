import { Button } from '../../components/button'
import { Input } from '../../components/input'

export const CreateUser = () => {
  return (
    <form className="flex h-dvh w-full flex-col items-end justify-between px-8 pt-20 pb-8">
      <div className="flex w-full flex-col gap-4">
        <Input label="Username" error={''} />
        <Input label="Email" error={''} />
        <Input label="Password" error={''} />
        <Input label="Confirm password" error={''} />

        <div className="flex flex-col gap-3 bg-white">
          <h4>Roles</h4>
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-3">
        <Button as="button" variant="secondary" type="button">
          Cancel
        </Button>
        <Button as="button" variant="primary" type="button">
          Create user
        </Button>
      </div>
    </form>
  )
}
