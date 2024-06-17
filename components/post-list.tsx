import { actions } from '@/server/actions'
import { DeletePost } from './delete-post'

export const PostList: React.FC = async () => {
  const posts = await actions.post.query.getPosts()

  return (
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
  )
}
