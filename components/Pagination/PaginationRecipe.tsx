import React from 'react'

interface PaginationProps {
  totalPosts: number
  postsPerPage: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const PaginationRecipe: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  // Create an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <>
      <div className=' flex justify-center'>
        {currentPage > 1 && (
          <button
            className='h-7 w-12 border rounded-lg bg-boxdark text-white'
            onClick={() => setCurrentPage(currentPage - 1)}
            aria-label='Go to Previous Page'
          >
            Prev
          </button>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`h-7 w-7 mx-1 border rounded-lg ${
              page === currentPage ? ' bg-boxdark text-white' : ''
            }`}
            onClick={() => setCurrentPage(page)}
            aria-label={`Go to Page ${page}`}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            className='h-7 w-12 border rounded-lg bg-boxdark text-white'
            onClick={() => setCurrentPage(currentPage + 1)}
            aria-label='Go to Next Page'
          >
            Next
          </button>
        )}
      </div>
    </>
  )
}

export default PaginationRecipe
