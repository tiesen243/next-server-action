import Image from 'next/image'
import Link from 'next/link'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { logout } from '@/server/actions/auth'
import { auth } from '@/server/auth'

export const Header: React.FC = async () => {
  const { user } = await auth()
  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <Image src="/logo.svg" width={32} height={32} alt="logo" className="dark:invert" />

        <div className="flex items-center gap-2">
          {user ? (
            <form action={logout} className="flex items-center gap-2">
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
