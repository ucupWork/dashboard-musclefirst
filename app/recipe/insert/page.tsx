import React from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import { Metadata } from 'next'

import RecipeFormLayouts from '@/components/Layouts/Recipes/RecipeFormLayouts'
export const metadata: Metadata = {
  title: 'Recipe Form Page | Muscle First Dashboard',
  description: 'Recipe form page for Muscle First Dashboard'
}

const Recipe: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName='Recipe Form Page' />
      <RecipeFormLayouts />
    </>
  )
}

export default Recipe
