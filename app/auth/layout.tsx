'use client'
import './../globals.css'
import './../data-tables-css.css'
import './../satoshi.css'
import { useState, useEffect } from 'react'

import Loader from '@/components/common/Loader'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [loading, setLoading] = useState<boolean>(true)

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
            <main>
                {/* <!-- ===== Main Content Start ===== --> */}
                  {children}
                {/* <!-- ===== Main Content End ===== --> */}
            </main>
          )}
        </div>
      </body>
    </html>
  )
}
