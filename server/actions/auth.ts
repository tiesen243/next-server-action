'use server'

import { Scrypt } from 'lucia'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { db } from '@/prisma'
import { lucia } from '@/server/auth/lucia'

export const register = async (fd: FormData) => {
  const schema = z
    .object({
      name: z.string().min(4),
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    })

  try {
    const { name, email, password } = schema.parse(Object.fromEntries(fd))
    const isExisted = await db.user.findUnique({ where: { email } })
    if (isExisted) throw new Error('User already exists')

    const hash = await new Scrypt().hash(password)
    const newUser = await db.user.create({
      data: { name, email, password: hash },
    })
    if (!newUser) throw new Error('Failed to create user')

    return { message: 'User registered successfully' }
  } catch (e) {
    if (e instanceof z.ZodError) return { fieldErrors: e.flatten().fieldErrors }
    else if (e instanceof Error) return { error: e.message }
  }
}

export const login = async (fd: FormData) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  try {
    const { email, password } = schema.parse(Object.fromEntries(fd))
    const user = await db.user.findUnique({ where: { email } })
    if (!user) throw new Error('User not found')

    const isValid = await new Scrypt().verify(user.password, password)
    if (!isValid) throw new Error('Password is incorrect')

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { message: 'User logged in successfully' }
  } catch (e) {
    if (e instanceof z.ZodError) return { fieldErrors: e.flatten().fieldErrors }
    else if (e instanceof Error) return { error: e.message }
  }
}

export const logout = async () => {
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}
