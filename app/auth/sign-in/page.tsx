import { SignInComp } from '@/components/Auth/SignIn'
import React from 'react'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Signin Page | Muscle First Dashboard',
  description: 'Signin page for Muscle First Dashboard'
}

const Signin = () => {
  return (
    <div className='p-10'>
      <div className='flex rounded-lg shadow-2xl overflow-hidden m-auto max-w-sm lg:max-w-5xl dark:shadow-white'>
        <div
          className='hidden lg:block lg:w-1/2 bg-cover'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        <SignInComp />
      </div>
    </div>
  )
}

export default Signin
