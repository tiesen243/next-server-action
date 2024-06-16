'use client'

import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { actions } from '@/server/actions'

export const Form: React.FC = () => {
  const router = useRouter()

  const [error, action, isPending] = useActionState(async (_: unknown, fd: FormData) => {
    const res = await actions.auth.mutation.register(fd)
    if (res?.fieldErrors) return res.fieldErrors
    if (res?.error) toast.error(res.error)
    if (res?.message) {
      toast.success(res.message)
      router.push('/login')
    }
  }, null)

  return (
    <form action={action} className="mb-4 space-y-4">
      {fields.map((field) => (
        <FormField key={field.name} {...field} error={error?.[field.name]} />
      ))}

      <Button className="w-full" isLoading={isPending}>
        Register
      </Button>
    </form>
  )
}

const fields = [
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'password', type: 'password', label: 'Password' },
  { name: 'confirmPassword', type: 'password', label: 'Confirm Password' },
]
