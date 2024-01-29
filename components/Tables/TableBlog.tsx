'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import PaginationBlog from '../Pagination/PaginationBlog'

interface Blog {
  title: string
  slug: string
  category: string
  img_blog: string
  tb_users: {
    id: string
    username: string
    email: string
  }
}

const TableBlog: React.FC = () => {
  const [data, setData] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(false)

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

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postsPerPage] = useState<number>(10)

  const lastPostIndex: number = currentPage * postsPerPage
  const firstPostIndex: number = lastPostIndex - postsPerPage
  const currentPosts: Blog[] = data.slice(firstPostIndex, lastPostIndex)

  return (
    <div className='px-5 pt-6 pb-2.5'>
      <div className='max-w-full overflow-x-auto'>
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
              <th className='py-4 px-4 font-medium text-black dark:text-white'>
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
                    <div className='flex items-center space-x-3.5'>
                      <button className='hover:text-primary'>
                        <svg
                          className='fill-current'
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          {/* SVG Path for the first button */}
                        </svg>
                      </button>
                      <button className='hover:text-primary'>
                        <svg
                          className='fill-current'
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          {/* SVG Path for the second button */}
                        </svg>
                      </button>
                      <button className='hover:text-primary'>
                        <svg
                          className='fill-current'
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          {/* SVG Path for the third button */}
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div>
          <PaginationBlog
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default TableBlog
