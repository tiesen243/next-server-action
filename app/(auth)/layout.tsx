import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Authenticating',
}

const AuthLayout: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const { user, session } = await auth()
  if (user ?? session) redirect('/')

  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center gap-4">{children}</div>
  )
}

export default AuthLayout
