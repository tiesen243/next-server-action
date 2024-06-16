'use client'

import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { actions } from '@/server/actions'

export const Form: React.FC = () => {
  const router = useRouter()
  const { mutate } = useAuth()

  const [error, action, isPending] = useActionState(async (_: unknown, fd: FormData) => {
    const res = await actions.auth.mutation.login(fd)
    if (res?.fieldErrors) return res.fieldErrors
    if (res?.error) toast.error(res.error)
    if (res?.message) {
      toast.success(res.message)
      mutate()
      router.push('/')
    }
  }, null)

  return (
    <form action={action} className="mb-4 space-y-4">
      <FormField name="email" type="email" label="Email" error={error?.email} />
      <FormField name="password" type="password" label="Password" error={error?.password} />

      <Button className="w-full" isLoading={isPending}>
        Login
      </Button>
    </form>
  )
}
