'use server'

import { unstable_cache as cache, revalidateTag } from 'next/cache'
import { z } from 'zod'

import { db } from '@/prisma'
import { auth } from '@/server/auth'

export const getPosts = cache(
  async () => {
    const posts = await db.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return posts
  },
  ['posts'],
  { tags: ['posts'] },
)

export const createPost = async (formData: FormData) => {
  const { user } = await auth()
  const schema = z.object({
    title: z.string().min(4),
    content: z.string().min(10),
  })

  try {
    if (!user) throw new Error('You must be logged in to create a post')
    const { title, content } = schema.parse(Object.fromEntries(formData))

    const post = await db.post.create({
      data: { title, content, author: { connect: { id: user.id } } },
    })
    if (!post) throw new Error('Failed to create post')

    revalidateTag('posts')
    return { success: true }
  } catch (e) {
    if (e instanceof z.ZodError) return { fieldErrors: e.flatten().fieldErrors, success: false }
    else if (e instanceof Error) return { error: e.message, success: false }
  }
}

export const deletePost = async (formData: FormData) => {
  try {
    const { user } = await auth()
    if (!user) throw new Error('You must be logged in to delete a post')

    const post = await db.post.findUnique({ where: { id: String(formData.get('id')) } })
    if (!post) throw new Error('Post not found')
    if (post.authorId !== user.id) throw new Error('You do not have permission to delete this post')

    await db.post.delete({ where: { id: String(formData.get('id')) } })

    revalidateTag('posts')

    return { success: true }
  } catch (e) {
    if (e instanceof Error) return { error: e.message, success: false }
  }
}
