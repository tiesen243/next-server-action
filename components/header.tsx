import type { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { SignOutBtn } from './sign-out-btn'
import { ThemeToggle } from './theme-toggle'

export const Header: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} className="dark:invert" />

        <div className="flex items-center gap-2 text-lg font-medium">
          {user ? (
            <>
              <p>{user.name}</p>
              <SignOutBtn />
            </>
          ) : (
            <>
              <Link href="/sign-up" className="hover:underline">
                Sign Up
              </Link>
              |
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
