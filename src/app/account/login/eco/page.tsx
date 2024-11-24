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

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-center font-bold text-gray-700 uppercase py-10'>Login as ECO!</h1>



        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            {
            ...register('email', { required: true })}
            id="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
          {
            errors.email && (
              <p className="text-red-500 text-xs italic">Email is required</p>
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
          <Link href='/account/login'>
            Login as Voter
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
