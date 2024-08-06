import type { NextPage } from 'next'
import { Suspense } from 'react'

import { PostList, PostListSkeleton } from '@/components/post/list'
import { CreatePost } from '@/components/post/create'

const Page: NextPage = () => (
  <>
    <CreatePost />

    <Suspense fallback={<PostListSkeleton />}>
      <PostList />
    </Suspense>
  </>
)

export default Page
