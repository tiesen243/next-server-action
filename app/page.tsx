import type { NextPage } from 'next'
import Link from 'next/link'

import { CreatePost } from '@/components/create-post'
import { DeletePost } from '@/components/delete-post'
import { actions } from '@/server/actions'

const Page: NextPage = async () => {
  const posts = await actions.post.query.getPosts()

  return (
    <>
      <CreatePost />
      <p className="mb-4 text-center">
        Protected page. You must be logged in to see this page. You can log in by{' '}
        <Link href="/protected" className="underline-offset-4 hover:underline">
          visiting
        </Link>
      </p>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id} className="space-y-4 rounded-md border p-6 shadow-lg">
            <div>
              <h3 className="line-clamp-1 text-2xl font-bold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.author.name}</p>
            </div>

            <p className="line-clamp-1 break-all">{post.content}</p>

            <DeletePost id={post.id} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
