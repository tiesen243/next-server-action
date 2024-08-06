import type { NextPage } from 'next'

import { SignInForm } from '../_components/sign-in-form'

const Page: NextPage = () => (
  <>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Sign In</h1>
    <SignInForm />
  </>
)

export default Page
