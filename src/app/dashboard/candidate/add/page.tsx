'use client'
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFormInputs {
    constituency_id: string,
    candidate: string,
    party_id: string,
}


export default function AddAdmin() {
    const [errMsg, setErrMsg] = useState('')

    const { register, formState, handleSubmit, watch } = useForm<IFormInputs>();
    const { errors, submitCount }: any = formState
    const router = useRouter()

    const [party, setParty] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/party`)
            .then(r => r.json())
            .then(r => {
                setParty(r?.result)
            })
    }, [])

    const [constituency, setConstituency] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/constituency`)
            .then(r => r.json())
            .then(r => {
                setConstituency(r?.result)
            })
    }, [])

    const field = [
        {
            placeholder: "Name",
            name: 'candidate',
            require: true,
            type: 'text',
            pattern: /[a-zA-Z]/g,
            patternMsg: 'Please provide name'
        },
    ]


    const onSubmit: SubmitHandler<IFormInputs> = async info => {

        const res = await fetch('/api/candidate', {
            body: JSON.stringify(info),
            method: "POST"
        });
        const data = await res?.json()
        setErrMsg('')
        if (data?.success) {
            toast.success("Successfully create a new candidate")
            router.push('/dashboard/candidate')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        else {
            setErrMsg(data?.message)
        }
    }

    return (
        <main className="flex items-center justify-center flex-col sm:p-6 ">
            <div className="w-full p-6">
                {/* <h1 className="mb-4 text-xl font-semibold text-gray-700">
                        Welcome !
                    </h1> */}
                <form onSubmit={handleSubmit(onSubmit)} className='pt-6'>
                    <span className="text-xs text-red-500">
                        {
                            errMsg
                        }
                    </span>
                    <div className=' flex-col gap-4 grid sm:grid-cols-2 xl:grid-cols-3'>

                        {
                            field?.map((field, index) => {
                                const { placeholder, name, pattern, patternMsg, require, type, default_value }: any = field
                                return (
                                    <div
                                        key={index}
                                    >
                                        <label className="block text-sm text-gray-700 my-1" htmlFor={
                                            name
                                        }>
                                            {
                                                placeholder
                                            }
                                        </label>

                                        <input
                                            type={type}
                                            id={name}
                                            defaultValue={default_value}
                                            placeholder={placeholder}
                                            className="w-full input input-info rounded-sm h-10 text-sm "
                                            {...register(name,
                                                {
                                                    required: {
                                                        value: require,
                                                        message: placeholder + ' is required'
                                                    },
                                                    pattern: {
                                                        value: pattern,
                                                        message: patternMsg
                                                    }
                                                }
                                            )
                                            }
                                        />
                                        <p className='text-xs pt-1 text-red-500'>
                                            {
                                                errors?.[name]?.message
                                            }
                                        </p>

                                    </div>
                                )
                            })
                        }
                        <div
                        >
                            <label className="block text-sm text-gray-700 my-1" htmlFor='constituency_id'>
                                Constituency
                            </label>

                            <select
                                id="constituency_id"
                                className="w-full input input-info rounded-sm h-10 text-sm "
                                {...register('constituency_id',
                                    {
                                        required: {
                                            value: true,
                                            message: 'constituency is required'
                                        },
                                    }
                                )
                                }
                            >
                                {
                                    constituency?.map((r, index) => {
                                        return (
                                            <option value={r?.constituency_id} key={index}>
                                                {r?.constituency_name}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <p className='text-xs pt-1 text-red-500'>
                                {
                                    errors?.constituency_id?.message
                                }
                            </p>

                        </div>

                        <div
                        >
                            <label className="block text-sm text-gray-700 my-1" htmlFor='party_id'>
                                Party
                            </label>

                            <select
                                id="party_id"
                                className="w-full input input-info rounded-sm h-10 text-sm "
                                {...register('party_id',
                                    {
                                        required: {
                                            value: true,
                                            message: 'Party is required'
                                        },
                                    }
                                )
                                }
                            >
                                {
                                    party?.map((r, index) => {
                                        return (
                                            <option value={r?.party_id} key={index}>
                                                {r?.party}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <p className='text-xs pt-1 text-red-500'>
                                {
                                    errors?.party_id?.message
                                }
                            </p>

                        </div>
                    </div>
                    <button
                        className="btn btn-primary px-4 rounded btn-sm text-white mt-4 h-10 w-fit"
                    >
                        Add New
                    </button>
                </form>


            </div>
        </main>
    )
}
