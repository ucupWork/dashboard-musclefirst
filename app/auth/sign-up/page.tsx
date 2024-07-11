import { SignUpComp } from '@/components/Auth/SignUp'
import React from 'react'

const SignupUser = () => {
  return (
    <div className=' p-10'>
      <div className='flex rounded-lg shadow-2xl overflow-hidden m-auto max-w-sm lg:max-w-5xl dark:shadow-white'>
        <div
          className='hidden lg:block lg:w-1/2 bg-cover'
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1526408984842-5f1323d42469?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
          }}
        ></div>
        <SignUpComp />
      </div>
    </div>
  )
}

export default SignupUser
