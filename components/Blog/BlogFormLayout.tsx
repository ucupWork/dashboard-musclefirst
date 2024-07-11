'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Toaster, toast } from 'sonner'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })

const BlogFormLayouts = () => {
  // Router
  const router = useRouter()

  // Quill Text Editor
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean']
    ]
  }

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block'
  ]

  // Hooks Form
  const userId = localStorage.getItem('user_id')
  const [data, setData] = useState({
    user_id: userId,
    title: '',
    slug: '',
    category: '',
    keywords: '',
    quotes: '',
    description: '',
    meta_description: ''
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

  const handleQuillForm = (value: string) => {
    setData((prevData) => ({
      ...prevData,
      description: value
    }))
  }

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('user_id', data.user_id || '')
    formData.append('title', data.title)
    formData.append('slug', data.slug)
    formData.append('category', data.category)
    formData.append('keywords', data.keywords)
    formData.append('quotes', data.quotes)
    formData.append('description', data.description)
    formData.append('meta_description', data.meta_description)
    if (imgFile) {
      formData.append('img_blog', imgFile)
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_MUSCLE_API}/blog`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      toast.success(res.data.message, { duration: 2500 })
      router.push('/blog')
    } catch (err) {
      toast.error('Failed to upload data', { duration: 2500 })
    }
  }

  return (
    <>
      <Toaster
        position='bottom-center'
        expand={false}
        richColors
      />
      <div className='grid grid-cols-1 gap-4'>
        <div className='rounded px-5 border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1'>
          <h2 className='font-medium text-xl'>Form Blog Page</h2>
          <form>
            <label className='my-3 block text-black dark:text-white'>
              Blog Title
            </label>
            <input
              type='text'
              name='title'
              value={data.title}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            <label className='my-3 block text-black dark:text-white'>
              Blog Image (Insert Image)
            </label>
            <div
              id='FileUpload'
              className='relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5'
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
            <label className='my-3 block text-black dark:text-white'>
              Slug
            </label>
            <input
              type='text'
              name='slug'
              value={data.slug}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            <label className='my-3 block text-black dark:text-white'>
              Category
            </label>
            <input
              type='text'
              name='category'
              value={data.category}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            <label className='my-3 block text-black dark:text-white'>
              Keywords
            </label>
            <input
              type='text'
              name='keywords'
              value={data.keywords}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            <label className='my-3 block text-black dark:text-white'>
              Meta Description
            </label>
            <input
              type='text'
              name='meta_description'
              value={data.meta_description}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            <label className='my-3 block text-black dark:text-white'>
              Quotes
            </label>
            <input
              type='text'
              name='quotes'
              value={data.quotes}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            <div className='my-4'>
              <span className='font-medium'>Description</span>
              <div className='h-full w-full gap-5'>
                <QuillEditor
                  defaultValue=''
                  value={data.description}
                  onChange={handleQuillForm}
                  modules={quillModules}
                  formats={quillFormats}
                  className='h-72 mt-2 mb-10 md:mb-5 bg-white text-black'
                />
              </div>
            </div>
            <button
              type='button'
              onClick={onClick}
              className='block my-4 w-1/2 rounded-md bg-primary py-2 text-center text-xl font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            >
              Insert Blog
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default BlogFormLayouts
