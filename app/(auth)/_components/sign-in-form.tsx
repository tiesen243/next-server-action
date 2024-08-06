'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { signIn } from '@/server/actions/auth'

export const SignInForm: React.FC = () => {
  const router = useRouter()
  const form = useForm<FormValues>({ resolver })

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const res = await signIn(values)
      toast.success(res.message)
      router.push('/')
      router.refresh()
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  })

  const { errors, isSubmitting } = form.formState

  return (
    <Form onSubmit={handleSubmit} className="w-full max-w-screen-md">
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          register={form.register}
          error={errors[field.name]}
          disabled={isSubmitting}
        />
      ))}

      <Button isLoading={isSubmitting}>Login</Button>
    </Form>
  )
}

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
    ),
})

type FormValues = z.infer<typeof schema>

const resolver = zodResolver(schema)

const fields = [
  { name: 'email' as const, label: 'Email', type: 'email' },
  { name: 'password' as const, label: 'Password', type: 'password' },
]
