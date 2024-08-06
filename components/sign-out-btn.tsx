'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { signOut } from '@/server/actions/auth'

export const SignOutBtn: React.FC = () => {
  const router = useRouter()

  const handleClick = async () => {
    try {
      await signOut()
      toast.success('You have been signed out')
      router.push('/')
      router.refresh()
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }
  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <LogOutIcon />
    </Button>
  )
}
