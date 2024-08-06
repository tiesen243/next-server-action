'use client'

import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { signOut } from '@/server/actions/auth'

export const SignOutBtn: React.FC = () => {
  const router = useRouter()

  const handleClick = async () => {
    toast.promise(signOut(), {
      loading: 'Signing out...',
      success: 'Successfully signed out',
      error: 'Failed to sign out',
    })
    router.push('/')
    router.refresh()
  }
  return (
    <Button variant="ghost" size="icon" onClick={handleClick}>
      <LogOutIcon />
    </Button>
  )
}
