'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image';


interface UserData {
  id: string
  username: string
  email: string
  roles: string
  img_user: string
}

const UserDataHead: React.FC = () => {
//   const userId = localStorage.getItem('user_id')
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_MUSCLE_API}/users/${userId}`)
//       .then((res) => {
//         setUserData(res.data.data)
//       })
//       .catch(() => {})
//   }, [userId])
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className=' w-8 h-8'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
        />
      </svg>
      {/* {loading ? (
            <div className='animate-pulse'>
              <span className='bg-zinc-600 h-12 w-28'></span>
            </div>
          ) : (
            <>
              {userData && (
                <span className='hidden text-right lg:block'>
                  <span className='block text-sm font-medium text-black dark:text-white'>
                    {userData.username}
                  </span>
                  <span className='block text-xs'>{userData.roles}</span>
                </span>
              )}
              <span className='block'>
                {userData ? (
                  <Image
                    src={userData.img_user}
                    alt='User'
                    className='h-12 w-12 rounded-full object-cover'
                  />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                )}
              </span>
            </>
          )} */}
    </>
  )
}

export default UserDataHead
