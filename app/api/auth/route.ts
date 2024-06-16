import { NextResponse } from 'next/server'

import { auth } from '@/server/auth'

export const GET = async () => {
  const { user, session } = await auth()
  const isAuthed = !!user && !!session

  return NextResponse.json({
    user: { ...user, password: undefined },
    session,
    isAuthed,
  })
}
