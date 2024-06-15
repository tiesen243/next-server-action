import type { NextPage } from 'next'

import { CreatePost } from '@/components/create-post'
import { DeletePost } from '@/components/delete-post'
import { getPosts } from '@/server/actions/post'
import { auth } from '@/server/auth'

const Page: NextPage = async () => {
  const { user } = await auth()
  const posts = await getPosts()

  return (
    <>
      {user ? (
        <CreatePost />
      ) : (
        <p className="mb-4 text-center text-muted-foreground">
          You must be logged in to create a post
        </p>
      )}

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <li key={post.id} className="space-y-4 rounded-md border p-6 shadow-lg">
            <div>
              <h3 className="line-clamp-1 text-2xl font-bold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.author.name}</p>
            </div>

            <p className="line-clamp-1 break-all">{post.content}</p>

            {user?.id === post.author.id && <DeletePost id={post.id} />}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page