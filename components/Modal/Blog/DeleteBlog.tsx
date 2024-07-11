import axios from 'axios'
import React, { useEffect, useState, KeyboardEvent, MouseEvent } from 'react'
import { toast, Toaster } from 'sonner'

interface ModalProps {
  idBlog: string
}

const DeleteBlogModal: React.FC<ModalProps> = ({ idBlog }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    document.body.classList.add('overflow-y-hidden')
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.classList.remove('overflow-y-hidden')
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener(
        'keydown',
        handleKeyDown as unknown as EventListener
      )
    } else {
      document.removeEventListener(
        'keydown',
        handleKeyDown as unknown as EventListener
      )
    }
    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown as unknown as EventListener
      )
    }
  }, [isOpen])

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(idBlog)

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_MUSCLE_API}/blog/${idBlog}`
      )
      toast.success(res.data.message, { duration: 2500 })
      location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Toaster
        position='bottom-center'
        expand={false}
        richColors
      />
      <div>
        <button
          className='bg-strokedark text-white rounded-md px-4 py-2 hover:bg-strokedark transition'
          onClick={openModal}
        >
          Hapus Artikel
        </button>

        {isOpen && (
          <div
            id='modalConfirm'
            className='fixed z-50 inset-0 bg-stroke bg-opacity-60 overflow-y-auto h-full w-full px-4'
          >
            <div className='relative top-40 mx-auto shadow-xl rounded-md bg-white dark:bg-black-2 max-w-md'>
              <div className='flex justify-end p-2'>
                <button
                  onClick={closeModal}
                  type='button'
                  className='text-stroke bg-transparent hover:bg-stroke hover:text-stroke rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                >
                  <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>

              <div className='p-6 pt-0 text-center'>
                <svg
                  className='w-20 h-20 text-danger dark:text-primary mx-auto'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
                <h3 className='text-xl font-normal text-boxdark-2 dark:text-stroke mt-5 mb-6'>
                  Hapus Artikel ini?
                </h3>
                <span className='flex gap-4 items-center justify-center'>
                  <button
                    onClick={closeModal}
                    className=' text-strokedark bg-white border dark:border-strokedark font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center'
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    className='text-stroke bg-strokedark hover:bg-strokedark focus:ring-4 focus:ring-stroke font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2'
                  >
                    Ya, Hapus
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DeleteBlogModal
