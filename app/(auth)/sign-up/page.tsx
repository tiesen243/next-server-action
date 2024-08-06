import type { NextPage } from 'next'

import { SignUpForm } from '../_components/sign-up-form'

const Page: NextPage = () => (
  <>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Sign Up</h1>
    <SignUpForm />
  </>
)

export default Page
