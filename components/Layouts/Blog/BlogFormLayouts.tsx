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
  const [data, setData] = useState({
    user_id: '0ea9f1ea-de7a-404f-b6db-89c3f2d0c8eb',
    title: '',
    img_blog: '',
    slug: '',
    category: '',
    hashtag: '',
    summary: '',
    description: ''
  })

  console.log(data)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleQuillForm = (value: string) => {
    setData((data) => {
      return {
        ...data,
        description: value
      }
    })
  }

  let onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios
      .post(`${process.env.NEXT_PUBLIC_MUSCLE_API}/blog`, data)
      .then((res) => {
        toast.success(res.data.message, { duration: 2500 })
        router.push('/blog')
      })
      .catch((err) => {
        toast.error('Gagal input data', { duration: 2500 })
      })
  }

  return (
    <>
      <Toaster
        position='bottom-center'
        expand={false}
        richColors
      />{' '}
      <div className='grid grid-cols-1 gap-4'>
        <div className='rounded px-5 border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1'>
          <h2 className='font-medium text-xl'>Form Blog Page</h2>
          <form action=''>
            {/* User Id Hidden */}
            <input
              type='text'
              name='user_id'
              value={data.user_id}
              onChange={onChange}
              className='hidden'
            />
            {/* Tittle */}
            <label className='my-3 block text-black dark:text-white'>
              Blog Tittle
            </label>
            <input
              type='text'
              name='title'
              value={data.title}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            {/* Quill Image */}
            <label className='my-3 block text-black dark:text-white'>
              Blog Image (Insert Image Url)
            </label>
            <input
              type='text'
              name='img_blog'
              value={data.img_blog}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            {/* Slug */}
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
            {/* Category */}
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
            {/* Hashtag */}
            <label className='my-3 block text-black dark:text-white'>
              Hastag
            </label>
            <input
              type='text'
              name='hashtag'
              value={data.hashtag}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            {/* Summary */}
            <label className='my-3 block text-black dark:text-white'>
              Summary
            </label>
            <input
              type='text'
              name='summary'
              value={data.summary}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            {/* Quill Description */}
            <div className='mt-4'>
              <span className='font-medium'>Description</span>
              <div className='h-full w-full gap-5'>
                {' '}
                <QuillEditor
                  defaultValue=''
                  value={data.description}
                  onChange={handleQuillForm}
                  modules={quillModules}
                  formats={quillFormats}
                  className='w-full h-full mt-2 bg-white text-black dark:text-stroke'
                />
              </div>{' '}
            </div>
            <button
              type='button' // Change to 'button' to prevent form submission
              onClick={onClick}
              className='my-4 rounded-md bg-primary py-2 px-5 text-center text-xl font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
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
