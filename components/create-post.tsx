'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/lib/auth'
import { actions } from '@/server/actions'

export const CreatePost: React.FC = () => {
  const { isAuthed } = useAuth()
  const [error, setError] = useState<Record<string, string[] | undefined>>({})
  const [isPending, startTransition] = useTransition()

  const action = (e: React.FormEvent<HTMLFormElement>) =>
    startTransition(async () => {
      e.preventDefault()
      const form = e.currentTarget
      const res = await actions.post.mutation.createPost(new FormData(form))
      if (res?.fieldErrors) setError(res.fieldErrors)
      else setError({})

      if (res?.error) toast(res.error)
      if (res?.success) form.reset()
    })

  if (!isAuthed)
    return (
      <p className="mb-4 text-center text-muted-foreground">
        You must be logged in to create a post
      </p>
    )

  return (
    <form onSubmit={action} className="mb-4 space-y-4">
      <FormField label="Title" name="title" error={error.title} />
      <FormField label="Content" name="content" error={error.content} asChild>
        <Textarea />
      </FormField>

      <Button className="w-full" isLoading={isPending}>
        Create Post
      </Button>
    </form>
  )
}
