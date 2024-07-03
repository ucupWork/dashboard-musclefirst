'use client'
import React, { ChangeEvent, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Toaster, toast } from 'sonner'

const supabaseUrl = 'https://your-supabase-url'
const supabaseKey = 'your-supabase-key'
const supabase = createClient(supabaseUrl, supabaseKey)

export const SignUpComp = () => {
  const [confirmPassword, setConfirmPasword] = useState('')
  const [isError, setIsError] = useState('')
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  console.log(form)

  const checkValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const confirm = e.target.value
    setConfirmPasword(confirm)
    const cek = form.password
    if (cek !== confirm) {
      setIsError('Password not match!')
    } else {
      setIsError('')
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const cek = form.password

    if (cek !== confirmPassword) {
      return
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password
      })

      if (error) {
        console.log(error)
        toast.error('Error creating user')
      } else {
        console.log(user)
        toast.success('Successful creating user')
        // Optionally, you can save the username and role in a separate table
        const { data, error: insertError } = await supabase
          .from('profiles')
          .insert([{ id: user?.id, username: form.username, role: form.role }])

        if (insertError) {
          console.log(insertError)
          toast.error('Error saving user profile')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Toaster
        position='bottom-center'
        richColors
      />
      <div className='w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2'>
        <div className='w-full p-4 sm:p-12.5 xl:p-17.5'>
          <span className='mb-1.5 block font-medium'>Start for free</span>
          <h2 className='mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2'>
            Sign Up to Muscle First Dashboard
          </h2>

          <form>
            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>
                Name
              </label>
              <div className='relative'>
                <input
                  name='username'
                  onChange={handleChange}
                  type='text'
                  placeholder='Enter your full name'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                />
                <span className='absolute right-4 top-4'>
                  <svg
                    className='fill-current'
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g opacity='0.5'>
                      <path
                        d='M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z'
                        fill=''
                      />
                      <path
                        d='M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z'
                        fill=''
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>
                Email
              </label>
              <div className='relative'>
                <input
                  name='email'
                  onChange={handleChange}
                  type='email'
                  placeholder='Enter your email'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  required
                />
                <span className='absolute right-4 top-4'>
                  <svg
                    className='fill-current'
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g opacity='0.5'>
                      <path
                        d='M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z'
                        fill=''
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>
                Password
              </label>
              <div className='relative'>
                <input
                  name='password'
                  onChange={handleChange}
                  type='password'
                  placeholder='6+ Characters, 1 Capital letter'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  required
                />
                <span className='absolute right-4 top-4'>
                  <svg
                    className='fill-current'
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g opacity='0.5'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.025 8.5125V6.85313C14.025 4.8 12.3531 3.12812 10.3 3.12812C8.24688 3.12812 6.575 4.8 6.575 6.85313V8.5125H5.4875C4.45781 8.5125 3.62812 9.34219 3.62812 10.3719V17.0281C3.62812 18.0578 4.45781 18.8875 5.4875 18.8875H15.1125C16.1422 18.8875 16.9719 18.0578 16.9719 17.0281V10.3719C16.9719 9.34219 16.1422 8.5125 15.1125 8.5125H14.025ZM7.85625 6.85313C7.85625 5.37188 9.01875 4.20937 10.5 4.20937C11.9812 4.20937 13.1438 5.37188 13.1438 6.85313V8.5125H7.85625V6.85313ZM5.4875 17.8062C5.17422 17.8062 4.92812 17.5602 4.92812 17.2469V10.3719C4.92812 10.0586 5.17422 9.8125 5.4875 9.8125H15.1125C15.4258 9.8125 15.6719 10.0586 15.6719 10.3719V17.2469C15.6719 17.5602 15.4258 17.8062 15.1125 17.8062H5.4875Z'
                        fill=''
                      />
                      <path
                        d='M10.5 11.3093C9.74219 11.3093 9.13438 11.9172 9.13438 12.675C9.13438 13.3 9.51562 13.825 10.0594 14.0375V15.5375C10.0594 15.7844 10.275 16 10.5219 16C10.7688 16 10.9844 15.7844 10.9844 15.5375V14.0375C11.5281 13.825 11.9094 13.3 11.9094 12.675C11.8656 11.9172 11.2578 11.3093 10.5 11.3093ZM10.5 13.5562C10.1812 13.5562 9.94688 13.2781 9.94688 12.9594C9.94688 12.6406 10.225 12.4062 10.5 12.4062C10.8188 12.4062 11.0531 12.6844 11.0531 13.0031C11.0531 13.2781 10.8188 13.5562 10.5 13.5562Z'
                        fill=''
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className='mb-4'>
              <label className='mb-2.5 block font-medium text-black dark:text-white'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type='password'
                  onChange={checkValidation}
                  placeholder='6+ Characters, 1 Capital letter'
                  className='w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                  required
                />
                <span className='absolute right-4 top-4'>
                  <svg
                    className='fill-current'
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g opacity='0.5'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M14.025 8.5125V6.85313C14.025 4.8 12.3531 3.12812 10.3 3.12812C8.24688 3.12812 6.575 4.8 6.575 6.85313V8.5125H5.4875C4.45781 8.5125 3.62812 9.34219 3.62812 10.3719V17.0281C3.62812 18.0578 4.45781 18.8875 5.4875 18.8875H15.1125C16.1422 18.8875 16.9719 18.0578 16.9719 17.0281V10.3719C16.9719 9.34219 16.1422 8.5125 15.1125 8.5125H14.025ZM7.85625 6.85313C7.85625 5.37188 9.01875 4.20937 10.5 4.20937C11.9812 4.20937 13.1438 5.37188 13.1438 6.85313V8.5125H7.85625V6.85313ZM5.4875 17.8062C5.17422 17.8062 4.92812 17.5602 4.92812 17.2469V10.3719C4.92812 10.0586 5.17422 9.8125 5.4875 9.8125H15.1125C15.4258 9.8125 15.6719 10.0586 15.6719 10.3719V17.2469C15.6719 17.5602 15.4258 17.8062 15.1125 17.8062H5.4875Z'
                        fill=''
                      />
                      <path
                        d='M10.5 11.3093C9.74219 11.3093 9.13438 11.9172 9.13438 12.675C9.13438 13.3 9.51562 13.825 10.0594 14.0375V15.5375C10.0594 15.7844 10.275 16 10.5219 16C10.7688 16 10.9844 15.7844 10.9844 15.5375V14.0375C11.5281 13.825 11.9094 13.3 11.9094 12.675C11.8656 11.9172 11.2578 11.3093 10.5 11.3093ZM10.5 13.5562C10.1812 13.5562 9.94688 13.2781 9.94688 12.9594C9.94688 12.6406 10.225 12.4062 10.5 12.4062C10.8188 12.4062 11.0531 12.6844 11.0531 13.0031C11.0531 13.2781 10.8188 13.5562 10.5 13.5562Z'
                        fill=''
                      />
                    </g>
                  </svg>
                </span>
              </div>
            </div>

            <div className='mb-5'>
              <input
                type='submit'
                value='Sign Up'
                className='w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'
              />
            </div>
          </form>

          <p className='text-center text-base font-medium text-body-color'>
            Already a member?{' '}
            <Link href='/login' className='text-primary hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

