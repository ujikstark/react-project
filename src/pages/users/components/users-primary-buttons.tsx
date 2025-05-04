import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
// import { useUsers } from '../contexts/users-context'
import { Link } from 'react-router-dom'

export function UsersPrimaryButtons() {
  return (
    <div className='flex gap-2'>

      <Button className='space-x-1' asChild>
        <Link to="/users/create">
          <span>Add User</span> <IconUserPlus size={18} />
        </Link>
      </Button>
    </div>
  )
}
