'use client'

import { Trash2Icon } from 'lucide-react'

import { useSession } from '@/lib/session'
import { Button } from '@/components/ui/button'
import { deletePost } from '@/server/actions/post'

export const DeleteBtn: React.FC<{ id: string; uid: string }> = ({ id, uid }) => {
  const { isAuth, user } = useSession()
  if (!isAuth) return null
  if (user.id !== uid) return null

  const handleClick = async () => {
    await deletePost({ id })
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleClick}
      className="absolute right-0 top-0 z-10"
    >
      <Trash2Icon />
    </Button>
  )
}
