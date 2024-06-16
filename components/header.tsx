'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth'
import { actions } from '@/server/actions'

export const Header: React.FC = () => {
  const { isAuthed, user, mutate } = useAuth()

  const action = async () => {
    await actions.auth.mutation.logout()
    mutate()
  }

  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="h-8 w-8">
          <Image src="/logo.svg" alt="logo" className="dark:invert" fill />
        </Link>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <form action={action} className="flex items-center gap-2">
              <p>{user.name}</p> |
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </form>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
