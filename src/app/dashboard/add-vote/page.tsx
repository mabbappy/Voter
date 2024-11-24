'use client'
import { useAuth } from '@/context/Authentication/AuthenticationCheckProvider';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AddVote() {
    const [isVoted, setIsVoted] = useState<boolean>(false)
    const [isVoteStart, setIsVoteStart] = useState<boolean>(false)

    const { user_info } = useAuth()
    useEffect(() => {
        fetch(`/api/is-voted?voter_id=${user_info?.voter_id}&uvc=${user_info?.UVC}`)
            .then(r => r.json())
            .then(r => {
                const { isVoted, isStartElection } = r?.result
                setIsVoted(isVoted)
                setIsVoteStart(isStartElection)
            })
    }, [user_info?.UVC, user_info?.voter_id])


    const [constituencyCandidate, setConstituencyCandidate] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/candidate`)
            // fetch(`/api/constituency/${user_info?.constituency_id}`)
            .then(r => r.json())
            .then(r => {
                setConstituencyCandidate(r?.result)
            })
    }, [user_info?.constituency_id])

    const onSubmit = async (event: any) => {
        event.preventDefault()
        const canid = event.target.vote?.value
        if (canid) {
            const info = {
                UVC: user_info?.UVC,
                canid: canid,
                voter_id: user_info?.voter_id
            }
            const res = await fetch('/api/voting', {
                body: JSON.stringify(info),
                method: "POST"
            });

            const data = await res?.json()

            if (data?.success) {
                toast.success("Successfully insert your vote")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
            else {
                toast.error("Something is wrong")
            }
        }
        else {
            toast.error("Please select a party(candidate)")
        }


        // setErrMsg('')

        // else {
        //     setErrMsg(data?.message)
        // }
    }


    return (
        <div className='p-4'>
            <h2 className='text-2xl font-bold py-3'>
                Add Vote
            </h2>
            {
                isVoteStart ?
                    (isVoted &&
                        <p className='text-xl font-bold text-error px-1'>
                            Already you give a vote
                        </p>)
                    :
                    <p className='text-xl font-bold text-error px-1'>
                        Vote start not yet
                    </p>
            }
            <span className='text-2xl font-extrabold'>
                {
                    constituencyCandidate?.[0]?.constituency_name
                }
            </span>
            <form className=' ' onSubmit={(event) => onSubmit(event)}>
                <ul>
                    {
                        constituencyCandidate?.map((r, index) => {
                            return (
                                <li key={index}>
                                    <label
                                        htmlFor={r?.party?.replaceAll(" ", "-")}
                                        className={`${(isVoted ? " btn btn-sm h-10 rounded btn-disabled " : " btn btn-sm h-10 rounded cursor-pointer ")}     font-semibold w-fit my-1`}
                                    >
                                        <input
                                            value={r?.canid}
                                            type="radio" name="vote" className="radio  radio-info" id={r?.party?.replaceAll(" ", "-")}
                                            disabled={isVoted}
                                        />
                                        {
                                            r?.party
                                        }({
                                            r?.candidate
                                        })
                                    </label>
                                </li>
                            )
                        })
                    }
                </ul>
                <button className='btn btn-primary btn-sm rounded h-10 text-white mt-4' disabled={isVoted}>
                    Vote
                </button>
            </form>
        </div>
    );
}

export default AddVote;