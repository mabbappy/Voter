'use client'
import { login_api } from '@/config/config';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (voter_data: any) => {
    try {
      const response = await fetch(`${login_api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voter_data),
      });

      const data = await response?.json()
      if (data?.success) {
        window.location.reload()
        toast.success("Login successful");
      }
      else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
    }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=' sm:flex-1'>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-center font-bold text-gray-700 uppercase py-4'>Login as Voter!</h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uvc">
              UVC code
            </label>
            <input
              {
              ...register('uvc', { required: true })}
              id="uvc"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your uvc code"
            />
            {
              errors.uvc && (
                <p className="text-red-500 text-xs italic">UVC code is required</p>
              )
            }
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {
                  errors.password.message as string
                }
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="btn-primary btn w-full h-10 btn-sm rounded-sm  font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>

          <div className='pt-4'>
            <Link href='/account/register'>
              Voter Register
            </Link>
          </div>
          <div className='pt-4'>
            <Link href='/account/login/eco'>
              Login as ECO
            </Link>
          </div>
        </form>
      </div>

      <div className='h-full flex-1 hidden sm:block'>
        <img src="https://i.ibb.co/gd3bjmX/man-throws-letter-box-hand-260nw-1786550243.webp" alt="man-throws-letter-box-hand-260nw-1786550243" className='h-full' />
      </div>
    </div>
  );
}

export default Login;
