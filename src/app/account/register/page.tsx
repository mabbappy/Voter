'use client'
import { registration_api } from '@/config/config';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [constituency, setConstituency] = useState<any[]>([])
  useEffect(() => {
    fetch("/api/constituency")
      .then(r => r.json())
      .then(r => {
        setConstituency(r?.result)
      })
  }, [])

  const onSubmit = async (voter_data: any) => {
    try {
      const response = await fetch(`${registration_api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voter_data),
      });

      const data = await response?.json()
      if (data?.success) {
        window.location.reload()
        toast.success("Register successful");
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className=' sm:flex-1'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-center font-bold text-gray-700 uppercase py-4'>Register now (voter)!</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              id="name"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name.message as string}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of birth
            </label>
            <input
              {...register('dob', { required: 'Date of birth is required' })}
              id="dob"
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Date of birth"
            />
            {errors.dob && (
              <p className="text-red-500 text-xs italic">{errors.dob.message as string}</p>
            )}
          </div>

          <div className="mb-4">
            <div className='flex items-center gap-2'>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uvc">
                UVC code
              </label>
              <Link className='link text-xs' href='/blackboard'>Get UVC code</Link>
            </div>
            <input
              {...register('uvc', { required: 'UVC code is required' })}
              id="uvc"
              type="uvc"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your uvc"
            />

            {errors.uvc && (
              <p className="text-red-500 text-xs italic">{errors.uvc.message as string}</p>
            )}

          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="constituency">
              Constituency
            </label>
            <select
              {...register('constituency_id', { required: 'Constituency code is required' })}
              id="constituency"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {
                constituency?.map((r, index) => {
                  return (
                    <option value={r?.constituency_id} key={index}>{r?.constituency_name}</option>
                  )
                })
              }
            </select>

            {errors.constituency && (
              <p className="text-red-500 text-xs italic">{errors.constituency.message as string}</p>
            )}

          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })}
              id="password"
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3   leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password.message as string}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="btn-primary btn btn-sm h-10 rounded-sm font-bold py-2 px-4 w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className='pt-4'>
            <Link href='/account/login'>
              Login
            </Link>
          </div>

        </form>
      </div>

      <div className='hidden sm:block sm:flex-1 h-full'>
        <img src="https://i.ibb.co/ZVLSd4d/istockphoto-1340347594-612x612.jpg" alt="istockphoto-1340347594-612x612" className='h-full' />
      </div>

    </div>
  );
}

export default Register;
