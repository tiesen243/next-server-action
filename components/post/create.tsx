'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizonalIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { useSession } from '@/lib/session'
import { createPost } from '@/server/actions/post'

export const CreatePost: React.FC = () => {
  const { isAuth } = useSession()
  const form = useForm<FormValues>({ resolver })

  if (!isAuth) return null

  const handleSubmit = form.handleSubmit(async (values) => {
    await createPost(values)
    form.reset()
  })

  const { isSubmitting, errors } = form.formState

  return (
    <Form
      onSubmit={handleSubmit}
      className="mx-auto mb-4 flex w-full max-w-screen-md flex-row items-center justify-center gap-2"
    >
      <FormField
        register={form.register}
        name="content"
        placeholder="What's on your mind?"
        error={errors.content}
        disabled={isSubmitting}
        className="flex-1"
      />

      <Button variant="outline" size="icon" isLoading={isSubmitting}>
        <SendHorizonalIcon />
      </Button>
    </Form>
  )
}

const schema = z.object({
  content: z.string().min(4, "Post's content lenght must at least 4 character"),
})

type FormValues = z.infer<typeof schema>

const resolver = zodResolver(schema)
