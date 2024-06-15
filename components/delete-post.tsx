'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { deletePost } from '@/server/actions/post'

export const DeletePost: React.FC<{ id: string }> = ({ id }) => {
  const [isPending, startTransition] = useTransition()

  const action = (formData: FormData) =>
    startTransition(async () => {
      const res = await deletePost(formData)

      if (res?.error) toast.error(res.error)
      else toast.success('Post deleted successfully')
    })

  return (
    <form action={action}>
      <Button variant="destructive" className="w-full" isLoading={isPending}>
        Delete
      </Button>

      <input type="hidden" name="id" value={id} />
    </form>
  )
}
