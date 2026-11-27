import Enter from '@/components/enter'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // Captured once on first load. Client navigations keep this value, so
  // arriving at the index from another page does not show the enter screen.
  const [showEnter] = useState(() => router.pathname === '/')

  return <>
    <Component {...pageProps} />
    {showEnter && <Enter />}
    <Analytics />
  </>
}
