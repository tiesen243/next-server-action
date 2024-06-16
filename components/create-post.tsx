'use client'

import { useActionState } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/lib/auth'
import { actions } from '@/server/actions'

export const CreatePost: React.FC = () => {
  const { isAuthed } = useAuth()

  const [error, action, isPending] = useActionState(async (_: unknown, fd: FormData) => {
    const res = await actions.post.mutation.createPost(fd)
    if (res?.fieldErrors) return res.fieldErrors
    if (res?.error) toast.error(res.error)
    if (res?.message) toast.success(res.message)
  }, null)

  if (!isAuthed)
    return (
      <p className="mb-4 text-center text-muted-foreground">
        You must be logged in to create a post
      </p>
    )

  return (
    <form action={action} className="mb-4 space-y-4">
      <FormField label="Title" name="title" error={error?.title} />
      <FormField label="Content" name="content" error={error?.content} asChild>
        <Textarea />
      </FormField>

      <Button className="w-full" isLoading={isPending}>
        Create Post
      </Button>
    </form>
  )
}
