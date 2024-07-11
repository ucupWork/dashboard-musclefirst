'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import PaginationBlog from '../Pagination/PaginationBlog'
import DeleteBlogModal from '../Modal/Blog/DeleteBlog'

interface Blog {
  id: string
  title: string
  slug: string
  category: string
  img_blog: string
  description: string
  tb_users: {
    id: string
    username: string
    email: string
  }
}

const TableBlog: React.FC = () => {
  const [data, setData] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postsPerPage, setPostsPerPage] = useState<number>(10)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.NEXT_PUBLIC_MUSCLE_API}/blog`)
      .then((res) => {
        setLoading(false)
        setData(res.data.data)
      })
      .catch(() => {
        toast.error('Gagal ambil data')
      })
  }, [])

  const filteredData = data.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tb_users.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lastPostIndex: number = currentPage * postsPerPage
  const firstPostIndex: number = lastPostIndex - postsPerPage
  const currentPosts: Blog[] = filteredData.slice(firstPostIndex, lastPostIndex)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1) // Reset to the first page after search
  }

  const handlePostsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPostsPerPage(Number(event.target.value))
    setCurrentPage(1) // Reset to the first page after changing posts per page
  }

  return (
    <div className='px-5 pt-6 pb-2.5'>
      <div className='max-w-full overflow-x-auto'>
        <div className='grid grid-cols-3 mb-4 gap-3 text-black dark:text-white'>
          <input
            type='text'
            placeholder='Search by title, category, or author'
            className='p-2 border rounded col-span-2 bg-gray-2 dark:bg-meta-4'
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className='p-2 border rounded col-span-1 bg-gray-2 dark:bg-meta-4'
            value={postsPerPage}
            onChange={handlePostsPerPageChange}
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={data.length}>All</option>
          </select>
        </div>

        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
              <th className='min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>
                Article
              </th>
              <th className='min-w-[150px] py-4 px-4 font-medium text-black dark:text-white'>
                Image
              </th>
              <th className='min-w-[120px] py-4 px-4 font-medium text-black dark:text-white'>
                Author
              </th>
              <th className='min-w-[200px] py-4 px-4 font-medium text-black dark:text-white'>
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody className='animate-pulse'>
              <tr>
                <td className='bg-stroke h-40' />
                <td className='bg-stroke h-40' />
                <td className='bg-stroke h-40' />
                <td className='bg-stroke h-40' />
              </tr>
            </tbody>
          ) : (
            <tbody>
              {currentPosts.map((blog: Blog, key: number) => (
                <tr key={key}>
                  <td className='border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11'>
                    <a
                      href={`https://musclefirst.co.id/blog/${blog.slug}`}
                      target='blank'
                    >
                      <h5 className='font-medium text-black dark:text-white hover:underline'>
                        {blog.title}
                      </h5>
                    </a>
                    <p className='text-sm'>Category: {blog.category}</p>
                  </td>
                  <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <img
                      src={blog.img_blog}
                      alt='Brand'
                      width={80}
                      height={80}
                    />
                  </td>
                  <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <a
                      href={`https://musclefirst.co.id/profile/${blog.tb_users.id}`}
                      target='blank'
                    >
                      <h5 className='font-medium text-black dark:text-white hover:underline'>
                        {blog.tb_users.username}
                      </h5>
                    </a>
                    <p className='text-sm'>Email: {blog.tb_users.email}</p>{' '}
                  </td>
                  <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                    <DeleteBlogModal idBlog={blog.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div>
          <PaginationBlog
            totalPosts={filteredData.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            displaySections={3} // Pass the prop to handle display of pagination sections
          />
        </div>
      </div>
    </div>
  )
}

export default TableBlog
