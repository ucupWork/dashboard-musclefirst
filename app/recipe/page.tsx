import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'

import TableBlog from '@/components/Tables/TableBlog'
export const metadata: Metadata = {
  title: 'Recipe Table Page | Muscle First Dashboard',
  description: 'Recipe table page for Muscle First Dashboard'
}

const Blog: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName='Recipe Table Page' />
      <div className='grid grid-cols-1 gap-4'>
        <div className='rounded px-5 border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1'>
          <h2 className='font-medium text-xl'>Table Recipe Page</h2>
          <TableBlog />
        </div>
      </div>
    </>
  )
}

export default Blog
