'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Toaster, toast } from 'sonner'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })

const RecipeFormLayouts = () => {
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
    slug: '',
    category: '',
    calories: '',
    protein: '',
    recipe_ingredients: '',
    img_recipe: '',
    hashtag: '',
    summary: '',
    video_link: ''
  })

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    console.log(data)
  }

  const handleQuillRecipe = (value) => {
    setData((data) => {
      return {
        ...data,
        recipe_ingredients: value
      }
    })
  }

  const handleQuillStep = (value) => {
    setData((data) => {
      return {
        ...data,
        summary: value
      }
    })
  }

  let onClick = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.NEXT_PUBLIC_MUSCLE_API}/recipes`, data)
      .then((res) => {
        toast.success(res.data.message, { duration: 2500 })
        router.push('/recipe')
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
              Recipe Tittle
            </label>
            <input
              type='text'
              name='title'
              value={data.title}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            {/* Image */}
            <label className='my-3 block text-black dark:text-white'>
              Recipe Image (Insert Image Url)
            </label>
            <input
              type='text'
              name='img_recipe'
              value={data.img_recipe}
              onChange={onChange}
              className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
            />
            {/* Video */}
            <label className='my-3 block text-black dark:text-white'>
              Recipe Video (Insert Video Url)
            </label>
            <input
              type='text'
              name='video_link'
              value={data.video_link}
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
            <div className='grid grid-cols-2 gap-4'>
              {/* Calories */}
              <div>
                <label className='my-3 block text-black dark:text-white'>
                  Calories
                </label>
                <div className='grid grid-cols-4 gap-2'>
                  <input
                    type='text'
                    name='calories'
                    value={data.calories}
                    onChange={onChange}
                    className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 col-span-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
                  />
                  <p className='col-span-1 pt-3'>kkal</p>
                </div>
              </div>
              {/* Protein */}
              <div>
                <label className='my-3 block text-black dark:text-white'>
                  Protein
                </label>
                <div className='grid grid-cols-4 gap-2'>
                  <input
                    type='text'
                    name='protein'
                    value={data.protein}
                    onChange={onChange}
                    className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-3 col-span-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
                  />
                  <p className='col-span-1 pt-3'>gram</p>
                </div>
              </div>
            </div>
            {/* Quill Description */}
            <div className='mt-4'>
              <span className='font-medium'>Recipe Ingredients</span>
              <div className='h-full w-full gap-5'>
                {' '}
                <QuillEditor
                  defaultValue=''
                  value={data.recipe_ingredients}
                  onChange={handleQuillRecipe}
                  modules={quillModules}
                  formats={quillFormats}
                  className='w-full h-full mt-2 bg-white text-black dark:text-stroke'
                />
              </div>{' '}
            </div>
            {/* Quill How to Make */}
            <div className='mt-4'>
              <span className='font-medium'>How To Make</span>
              <div className='h-full w-full gap-5'>
                {' '}
                <QuillEditor
                  defaultValue=''
                  value={data.summary}
                  onChange={handleQuillStep}
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
              Insert Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RecipeFormLayouts
