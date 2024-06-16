'use client'

import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { actions } from '@/server/actions'
import { useAuth } from '@/lib/auth'

export const Form: React.FC = () => {
  const router = useRouter()
  const { mutate } = useAuth()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<Record<string, string[] | undefined>>({})

  const action = (formData: FormData) =>
    startTransition(async () => {
      const res = await actions.auth.mutation.login(formData)
      if (res?.fieldErrors) setError(res.fieldErrors)
      else setError({})

      if (res?.error) toast.error(res.error)
      if (res?.message) {
        toast.success(res.message)
        router.push('/')
        mutate()
      }
    })

  return (
    <form action={action} className="mb-4 space-y-4">
      <FormField name="email" type="email" label="Email" error={error.email} />
      <FormField name="password" type="password" label="Password" error={error.password} />

      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}
