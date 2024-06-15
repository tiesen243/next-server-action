'use client'

import { useState, useTransition } from 'react'

import { FormField } from '@/components/form-field'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createPost } from '@/server/actions/post'
import { toast } from 'sonner'

export const CreatePost: React.FC = () => {
  const [error, setError] = useState<Record<string, string[] | undefined>>({})
  const [isPending, startTransition] = useTransition()

  const action = (e: React.FormEvent<HTMLFormElement>) =>
    startTransition(async () => {
      e.preventDefault()
      const form = e.currentTarget
      const res = await createPost(new FormData(form))
      if (res?.fieldErrors) setError(res.fieldErrors)
      else setError({})

      if (res?.error) toast(res.error)
      if (res?.success) form.reset()
    })
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
