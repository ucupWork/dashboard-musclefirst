'use client';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const SignInComp = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast('Proses login', {
      duration: 5000
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_MUSCLE_API}/users/login`, form);
      toast.success(res.data.message);
      if (typeof localStorage !== 'undefined') {
        // Save user_id as JSON string
        localStorage.setItem('user_id', res.data.data.user.id);
      } else {
        console.log('Web Storage is not supported in this environment.');
      }
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response ? error.response.data.message : 'Login failed');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <div className="w-full p-8 lg:w-1/2">
        <form>
          <h2 className="text-2xl font-semibold text-center dark:text-stroke">Muscle First</h2>
          <h2 className="text-xl text-center dark:text-stroke">Masuk Kedalam Akun Anda</h2>
          <div className="mt-4 flex items-center justify-between dark:text-stroke">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            Login dengan email
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-bold mb-2 dark:text-stroke">Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-gray-200 dark:bg-form-strokedark dark:text-stroke focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between dark:text-stroke">
              <label className="block text-sm font-bold mb-2">Password</label>
            </div>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="bg-gray-200 dark:bg-form-strokedark dark:text-stroke focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
            />
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-strokedark dark:bg-white text-white dark:text-boxdark duration-500 hover:text-primary font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              Login
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between font-semibold duration-500 hover:font-extrabold text-center dark:text-stroke">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link href="/auth/sign-up" className="text-xs uppercase">
              Belum Punya akun? <br />
              Registrasi disini
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </>
  );
};
