import { getPosts } from '@/server/actions/post'
import { Skeleton } from '@/components/ui/skeleton'

import { DeleteBtn } from './delete-btn'

export const PostList = async () => {
  try {
    const posts = await getPosts()

    return (
      <ul className="mx-auto flex max-w-screen-md flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b py-2">
            <DeleteBtn id={post.id} uid={post.author.id} />
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{post.content}</h3>
            <p className="text-sm text-muted-foreground">{post.author.name}</p>
          </li>
        ))}
      </ul>
    )
  } catch (e) {
    if (e instanceof Error) return <p className="text-center text-muted-foreground">{e.message}</p>
  }
}

export const PostListSkeleton: React.FC = () => (
  <ul className="mx-auto flex max-w-screen-md flex-col gap-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <li key={index} className="border-b py-2 ">
        <Skeleton className="mb-2 h-6 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </li>
    ))}
  </ul>
)
