'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { register } from '@/server/actions/auth'

export const Form: React.FC = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<Record<string, string[] | undefined>>({})

  const action = (formData: FormData) =>
    startTransition(async () => {
      const res = await register(formData)
      if (res?.fieldErrors) setError(res.fieldErrors)
      else setError({})

      if (res?.error) toast.error(res.error)
      if (res?.message) {
        toast.success(res.message)
        router.push('/login')
      }
    })

  return (
    <form action={action} className="space-y-4">
      <FormField name="name" type="text" label="Name" error={error.name} />
      <FormField name="email" type="email" label="Email" error={error.email} />
      <FormField name="password" type="password" label="Password" error={error.password} />
      <FormField
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        error={error.confirmPassword}
      />

      <Button className="w-full" isLoading={isPending}>
        Register
      </Button>
    </form>
  )
}
