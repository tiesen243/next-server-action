'use server'

import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'

import { auth } from '@/server/auth'
import { lucia } from '@/server/auth/lucia'
import { db } from '@/server/db'

interface SignUpArgs {
  name: string
  email: string
  password: string
}

export const signUp = async (args: SignUpArgs) => {
  const isExist = await db.user.findUnique({ where: { email: args.email } })
  if (isExist) throw new Error('User already existed')

  const hash = await new Scrypt().hash(args.password)
  const newUser = await db.user.create({
    data: { ...args, password: hash },
  })

  if (!newUser) throw new Error('Failed to sign up')
  return { message: 'Signed in successfully' }
}

export const signIn = async (args: Omit<SignUpArgs, 'name'>) => {
  const user = await db.user.findUnique({ where: { email: args.email } })
  if (!user) throw new Error('User not found')

  const isValid = await new Scrypt().verify(user.password, args.password)
  if (!isValid) throw new Error('Password is incorrect')

  let sessionCookie
  try {
    const session = await lucia.createSession(user.id, {})
    sessionCookie = lucia.createSessionCookie(session.id)
  } catch (error) {
    sessionCookie = lucia.createBlankSessionCookie()
    throw new Error('Failed to create session')
  }

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return { message: 'Signed in successfully' }
}

export const signOut = async () => {
  const { session } = await auth()
  if (!session) throw new Error('You are not signed in')

  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  return { message: 'Signed out successfully' }
}
