import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TextEditor from '@/components/Texteditor/TextEditor'
import { Metadata } from 'next'
import TextForm from '@/components/Form/TextForm'
import { ImageForm } from '@/components/Form/ImageForm'
export const metadata: Metadata = {
  title: 'Recipe Form Page | Muscle First Dashboard',
  description: 'Recipe form page for Muscle First Dashboard'
}

const Recipe: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName='Recipe Form Page' />
      <div className='grid grid-cols-1 gap-4'>
        <div className='rounded px-5 border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1'>
          <h2 className='font-medium text-xl'>Form Recipe Page</h2>
          <form action=''>
            <TextForm
              formName='Recipe Title'
              formChange=''
              formValue=''
            />
            <ImageForm
              formName='Recipe Image'
              formChange=''
              formValue=''
            />
            <TextForm
              formName='Keywords'
              formChange=''
              formValue=''
            />
            <TextForm
              formName='Calories'
              formChange=''
              formValue=''
            />
            <TextForm
              formName='Protein'
              formChange=''
              formValue=''
            />
            <TextEditor
              formName='Recipe Ingredients'
              formValue=''
              valueChange=''
            />
            <TextEditor
              formName='Description'
              formValue=''
              valueChange=''
            />
            <button
              type='submit'
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

export default Recipe
