'use client'
import React, { useEffect, useState } from 'react'
import CardDataStats from '../CardDataStats'
import TableBlog from '@/components/Blog/TableBlog'
import axios from 'axios'
import Link from 'next/link'

interface UserData {
  id: string
  username: string
  email: string
  roles: string
  img_user: string
}

const HomePage: React.FC = () => {
  const userId = localStorage.getItem('user_id')
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MUSCLE_API}/users/${userId}`)
      .then((res) => {
        setUserData(res.data.data)
      })
      .catch(() => {})
  }, [userId])
  return (
    <>
      <div className='grid grid-cols-1'>
        <CardDataStats
          title={`Selamat Datang ${userData?.username}`}
          description='Dashboard ini dipergunakan untuk input article SEO website musclefirst.co.id'
        >
          <></>
        </CardDataStats>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <CardDataStats
          title={`Artikel Muscle First`}
          description=''
        >
          <div className='grid grid-cols-2 gap-3 mt-3'>
            <Link
              href={'/blog'}
              className='w-full flex justify-center bg-stroke text-boxdark rounded-sm dark:text-bodydark dark:bg-none dark:border dark:border-body'
            >
              <div className='p-2 text-xs text-center'>
                Lihat table data artikel
              </div>
            </Link>
            <Link
              href={'/blog/insert'}
              className='w-full flex justify-center bg-stroke text-boxdark rounded-sm dark:text-bodydark dark:bg-none dark:border dark:border-body'
            >
              <div className='p-2 text-xs text-center'>
                Tulis artikel disini
              </div>{' '}
            </Link>
          </div>
        </CardDataStats>

        <CardDataStats
          title={`Resep Muscle First`}
          description=''
        >
          <div className='grid grid-cols-2 gap-3 mt-3'>
            <Link
              href={'/recipe'}
              className='w-full flex justify-center bg-stroke text-boxdark rounded-sm dark:text-bodydark dark:bg-none dark:border dark:border-body'
            >
              <span className='p-2 text-xs text-center'>
                Lihat table data artikel resep
              </span>
            </Link>
            <Link
              href={'/recipe/insert'}
              className='w-full flex justify-center bg-stroke text-boxdark rounded-sm dark:text-bodydark dark:bg-none dark:border dark:border-body'
            >
              <span className='p-2 text-xs text-center'>
                Tulis artikel resep disini
              </span>{' '}
            </Link>
          </div>
        </CardDataStats>
      </div>

      {/* <div className='mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <div className='bg-white rounded border-stroke pt-6 pb-2.5 shadow-default dark:border-boxdark dark:bg-boxdark'>
          <TableBlog />
        </div>
      </div> */}
    </>
  )
}

export default HomePage
