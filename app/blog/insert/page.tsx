import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'

import { Metadata } from 'next'
// import BlogFormLayout from '@/components/Blog/BlogFormLayout'

export const metadata: Metadata = {
  title: 'Blog Page | Muscle First Dashboard',
  description: 'Blog page for Muscle First Dashboard'
}

const Blog: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName='Blog Form Page' />
      {/* <BlogFormLayout /> */}
    </>
  )
}

export default Blog
