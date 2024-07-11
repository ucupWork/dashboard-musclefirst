'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import defaultUserImg from '@/public/images/user/default-profile.png'
import { toast, Toaster } from 'sonner'

interface UserData {
  id: string
  username: string
  email: string
  roles: string
  img_user: string
}

export const LayoutProfile = () => {
  // get user data
  const userId = localStorage.getItem('user_id')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_MUSCLE_API}/users/${userId}`)
      .then((res) => {
        setUserData(res.data.data)
        setLoading(false)
      })
      .catch(() => {})
  }, [userId])

  // change user profile
  const [data, setData] = useState({
    username: ''
  })
  console.log(data)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const [imgFile, setImgFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImgFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', data.username || '')
    if (imgFile) {
      formData.append('img_user', imgFile)
    }

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_MUSCLE_API}/users/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      toast.success(res.data.message, { duration: 2500 })
      location.reload()
    } catch (error) {
      console.log(error)
      toast.error('Gagal Update Data User', { duration: 2500 })
    }
  }

  return (
    <>
      <Toaster
        position='bottom-center'
        expand={false}
        richColors
      />
      <div className='overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='relative z-20 h-35 md:h-65'>
          <Image
            src={'/images/cover/cover-01.png'}
            alt='profile cover'
            className='h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center'
            width={970}
            height={260}
          />
        </div>
        <div className='px-4 pb-6 text-center lg:pb-8 xl:pb-11.5'>
          {loading ? (
            <>
              <div className='relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3'>
                <div className='relative drop-shadow-2 animate-pulse'>
                  <div className=' h-[160] w-[160] bg-body' />
                </div>
              </div>
              <div className='mt-4 animate-pulse'>
                <div className=' bg-stroke h-12 w-full' />
              </div>
            </>
          ) : (
            <>
              <div className='relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3'>
                <div className='relative drop-shadow-2'>
                  <Image
                    src={userData?.img_user || defaultUserImg}
                    className=' rounded-full'
                    width={160}
                    height={160}
                    alt='profile'
                  />
                  <label
                    htmlFor='profile'
                    className='absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2'
                  >
                    <svg
                      className='fill-current'
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z'
                        fill=''
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z'
                        fill=''
                      />
                    </svg>
                    <input
                      id='profile'
                      type='file'
                      className='hidden'
                      onChange={handleUpload}
                    />
                  </label>
                </div>
              </div>
              <div className='mt-4'>
                <h4 className='text-xl font-semibold text-black dark:text-white'>
                  {userData?.username}
                </h4>
                <p className='text-sm'>
                  <span className='font-medium'>{userData?.roles}</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='col-span-5 xl:col-span-2 mt-4'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke py-4 px-7 dark:border-strokedark'>
            <h3 className='font-medium text-black dark:text-white'>
              Change Profile
            </h3>
          </div>
          <div className='p-7'>
            <label className='my-3 block text-black dark:text-white'>
              Username
            </label>
            <input
              type='text'
              name='username'
              value={data.username}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />

            <div
              id='FileUpload'
              className='relative my-5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5'
            >
              <input
                type='file'
                accept='image/*'
                onChange={handleUpload}
                className='absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none'
              />
              <div className='flex flex-col items-center justify-center space-y-3'>
                <span className='flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z'
                      fill='#3C50E0'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z'
                      fill='#3C50E0'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z'
                      fill='#3C50E0'
                    />
                  </svg>
                </span>

                {preview ? (
                  <img
                    src={preview}
                    alt='Preview'
                    className='my-3'
                  />
                ) : (
                  <>
                    <p>
                      <p>
                        <span className='text-primary'>Click to upload</span> or
                        drag and drop
                      </p>
                    </p>
                    <p className='mt-1.5'>PNG, JPG or JPEG</p>
                    <p>(max 3 MB)</p>
                  </>
                )}
              </div>
            </div>

            <div className='flex justify-end gap-4.5'>
              <button
                className='flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95'
                type='submit'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
