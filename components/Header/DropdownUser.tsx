import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import UserDataHead from './userData';

interface UserData {
  id: string;
  username: string;
  email: string;
  roles: string;
  img_user: string;
}

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        dropdownOpen ||
        dropdown.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      ) {
        return;
      }
      setDropdownOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Close dropdown if Esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDropdownOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, []);

  const router = useRouter();
  // const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
  // const [userData, setUserData] = useState<UserData | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  const logOut = () => {
    localStorage.clear();
    toast.success('Log out berhasil', {
      duration: 3000
    });
    router.push('/auth/sign-in'); // Use router.push for redirecting
  };

  // useEffect(() => {
  //   if (userId) {
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_MUSCLE_API}/users/${userId}`)
  //       .then((res) => {
  //         setUserData(res.data.data);
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         toast.error('Login terlebih dahulu untuk mengakses dashboard');
  //         setLoading(false);
  //       });
  //   } else {
  //     setLoading(false); // In case userId is not available
  //   }
  // }, [userId]);

  return (
    <>
      <Toaster position='bottom-center' richColors />
      <div className='relative'>
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className='flex items-center gap-4'
          href='#'
        >
          {/* {loading ? (
            <div className='animate-pulse'>
              <span className='bg-zinc-600 h-12 w-28'></span>
            </div>
          ) : (
            <>
              {userData && (
                <span className='hidden text-right lg:block'>
                  <span className='block text-sm font-medium text-black dark:text-white'>
                    {userData.username}
                  </span>
                  <span className='block text-xs'>{userData.roles}</span>
                </span>
              )}
              <span className='block'>
                {userData ? (
                  <Image
                    width={112}
                    height={112}
                    src={userData.img_user}
                    alt='User'
                    className='h-12 w-12 rounded-full object-cover'
                  />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                    />
                  </svg>
                )}
              </span>
            </>
          )} */}
          <UserDataHead/>
          <svg
            className='hidden fill-current sm:block'
            width='12'
            height='8'
            viewBox='0 0 12 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z'
              fill=''
            />
          </svg>
        </Link>

        {/* Dropdown Start */}
        <div
          ref={dropdown}
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
            dropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
            <li>
              <Link
                href='/profile'
                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
              >
                <svg
                  className='fill-current'
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z'
                    fill=''
                  />
                  <path
                    d='M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z'
                    fill=''
                  />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                onClick={logOut}
              >
                <svg
                  className='fill-current'
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width={22} height={22} stroke='none' opacity={0} />
                  <path
                    d='M11.5 11.5 C11.5 11.7652 11.3946 12.0196 11.2071 12.2071 C11.0196 12.3946 10.7652 12.5 10.5 12.5 L1.5 12.5 C1.23478 12.5 0.98043 12.3946 0.792893 12.2071 C0.605357 12.0196 0.5 11.7652 0.5 11.5 L0.5 2.5 C0.5 2.23478 0.605357 1.98043 0.792893 1.79289 C0.98043 1.60536 1.23478 1.5 1.5 1.5 L10.5 1.5 C10.7652 1.5 11.0196 1.60536 11.2071 1.79289 C11.3946 1.98043 11.5 2.23478 11.5 2.5'
                    strokeLinecap='round'
                  />
                  <path
                    d='M6 7 L13.5 7'
                    strokeLinecap='round'
                  />
                  <path
                    d='M11.5 5 L13.5 7 L11.5 9'
                    strokeLinecap='round'
                  />
                </svg>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
        {/* Dropdown End */}
      </div>
    </>
  );
};

export default DropdownUser;
