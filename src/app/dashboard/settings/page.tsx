'use client'
import { useAuth } from '@/context/Authentication/AuthenticationCheckProvider';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Settings() {
    const [isVoteStartData, setIsVoteStartData] = useState<any>({})
    const [isStartElection, setIsStartElection] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/api/settings`)
            .then(r => r.json())
            .then(r => {
                setIsVoteStartData(r?.result?.[0])
                setIsStartElection((r?.result?.[0]?.isStartElection))
            })
    }, [])
    return (
        <div className='p-4'>
            <div className="form-control w-fit gap-4">
                <label className="cursor-pointer label">
                    <span className="text-lg font-bold mr-4">Stop voting</span>
                    <p className='flex items-center gap-2'>
                        <span>
                            Running
                        </span>
                        <span>
                            <input
                                type="checkbox"
                                className="toggle toggle-error"
                                checked={!isStartElection}
                                onChange={async (event) => {
                                    const confirm_user = confirm("Are you sure")
                                    if (confirm_user) {
                                        setIsStartElection(!isStartElection)
                                        const res = await fetch(`/api/settings?setting_id=${isVoteStartData?.setting_id}`, {
                                            method: "PUT",
                                            body: JSON.stringify({
                                                isStartElection: !isStartElection
                                            })
                                        })
                                        const data = await res?.json()
                                        if (data?.success) {
                                            window.location.reload()
                                        }
                                        else {
                                            toast.error("Something is wrong")
                                        }
                                    }
                                }}
                            />
                        </span>
                        <span>
                            Stop
                        </span>
                    </p>
                </label>
            </div>

        </div>
    );
}

export default Settings;