'use server'

import { unstable_cache as cache, revalidateTag } from 'next/cache'

import { db } from '@/server/db'
import { auth } from '@/server/auth'

export const getPosts = cache(
  async () => {
    const posts = await db.post.findMany({
      include: { author: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    if (!posts || posts.length < 1) throw new Error('No posts found')

    return posts
  },
  ['posts'],
  { tags: ['posts'] },
)

export const createPost = async ({ content }: { content: string }) => {
  const { user } = await auth()
  if (!user) throw new Error('You must be logged in to create a post')

  const post = await db.post.create({
    data: { content, author: { connect: { id: user.id } } },
  })
  if (!post) throw new Error('Post not created')

  revalidateTag('posts')

  return post
}

export const deletePost = async ({ id }: { id: string }) => {
  const { user } = await auth()
  if (!user) throw new Error('You must be logged in to create a post')

  const deletedPost = await db.post.delete({ where: { id } })
  if (!deletedPost) throw new Error('Post delete fail')

  revalidateTag('posts')

  return deletedPost
}
