'use client'
import './globals.css'
import './data-tables-css.css'
import './satoshi.css'
import { useState, useEffect } from 'react'

import Loader from '@/components/common/Loader'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const userId = localStorage.getItem('user_id')
    if (!userId) {
      router.push(`/auth/sign-in` || `/auth/sign-up`)
    }
  }, [router])

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <html lang='en'>
      <head>
        <link
          rel='shortcut icon'
          href='/icon.png'
          type='image/x-icon'
        />
      </head>
      <body suppressHydrationWarning={true}>
        <div className='dark:bg-boxdark-2 dark:text-bodydark'>
          {loading ? (
            <Loader />
          ) : (
            <div className='flex h-screen overflow-hidden'>
              {/* <!-- ===== Sidebar  ===== --> */}
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                {/* <!-- ===== Header ===== --> */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <main>
                  <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                    {children}
                  </div>
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  )
}
