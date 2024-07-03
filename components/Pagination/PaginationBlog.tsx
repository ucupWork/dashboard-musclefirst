import React from 'react'

interface PaginationProps {
  totalPosts: number
  postsPerPage: number
  currentPage: number
  setCurrentPage: (page: number) => void
  displaySections: number // Add this prop to handle display of pagination sections
}

const PaginationBlog: React.FC<PaginationProps> = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
  displaySections,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handleClick = (number: number) => {
    setCurrentPage(number)
  }

  const startIndex = Math.max(0, currentPage - displaySections)
  const endIndex = Math.min(pageNumbers.length, currentPage + displaySections - 1)
  const displayPageNumbers = pageNumbers.slice(startIndex, endIndex)

  return (
    <nav>
      <ul className='flex justify-center items-center gap-4 p-5'>
        {currentPage > 1 && (
          <li>
            <button onClick={() => handleClick(currentPage - 1)} className='border-2 rounded-lg px-2 py-1'>Prev</button>
          </li>
        )}
        {displayPageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => handleClick(number)}>{number}</button>
          </li>
        ))}
        {currentPage < pageNumbers.length && (
          <li>
            <button onClick={() => handleClick(currentPage + 1)} className='border-2 rounded-lg px-2 py-1'>Next</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default PaginationBlog
