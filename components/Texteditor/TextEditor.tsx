'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })
interface TextEditorProps {
  formName: string
  valueChange: string
  formValue: string
}

export default function TextEditor({
  formName,
  formValue,
  valueChange
}: TextEditorProps) {
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

  return (
    <article>
      <div className='mt-4'>
        <span className='font-medium'>{formName}</span>
        <div className='h-full w-full gap-5'>
          {' '}
          <QuillEditor
            name={formValue}
            onChange={valueChange}
            modules={quillModules}
            formats={quillFormats}
            className='w-full h-full mt-2 bg-white text-black dark:bg-bodydark'
          />
        </div>{' '}
      </div>
    </article>
  )
}
