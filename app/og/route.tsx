import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { siteConfig } from '@/lib/site'

interface Props {
  params: {
    title?: string
    desc?: string
  }
}

export const runtime = 'edge'

export const GET = async (_: NextRequest, { params }: Props): Promise<ImageResponse> => {
  const title = params.title ?? siteConfig.meta.applicationName ?? ''
  const description = params.desc ?? siteConfig.meta.description

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full text-white p-20 items-center justify-center bg-black">
        <h2 tw="text-4xl capitalize">{title}</h2>
        <p tw="text-2xl mt-4">{description}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
