import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TextEditor from '@/components/Texteditor/TextEditor'
import { Metadata } from 'next'
import TextForm from '@/components/Form/TextForm'
import { ImageForm } from '@/components/Form/ImageForm'
export const metadata: Metadata = {
  title: 'Blog Page | Muscle First Dashboard',
  description: 'Blog page for Muscle First Dashboard'
}

const Blog: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName='Blog Form Page' />
      <div className='grid grid-cols-1 gap-4'>
        <div className='rounded px-5 border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1'>
          <h2 className='font-medium text-xl'>Form Blog Page</h2>
          <form action=''>
            <TextForm
              formName='Title'
              formChange=''
              formValue=''
            />
            <ImageForm
              formName='Blog Image'
              formChange=''
              formValue=''
            />
            <TextForm
              formName='Image Link'
              formChange=''
              formValue=''
            />
            <TextForm
              formName='Keywords'
              formChange=''
              formValue=''
            />
            <TextEditor
              formName='Excerpt'
              formValue=''
              valueChange=''
            />
            <TextEditor
              formName='Description'
              formValue=''
              valueChange=''
            />
            <TextForm
              formName='Highlight'
              formChange=''
              formValue=''
            />
            <button
              type='submit'
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

export default Blog
