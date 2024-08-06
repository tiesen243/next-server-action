'use client'

import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const [isMounted, setMounted] = useState<boolean>()
  useEffect(() => setMounted(true), [])
  if (!isMounted) return <Button variant="outline" size="icon" isLoading />

  const handleClick = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <Button onClick={handleClick} variant="outline" size="icon">
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
