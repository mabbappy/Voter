'use client'

import { useAuth } from "@/context/Authentication/AuthenticationCheckProvider"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6"
import Swal from "sweetalert2"

function Candidate() {
    const [constituencyCandidate, setConstituencyCandidate] = useState<any[]>([])
    const { user_info } = useAuth()
    useEffect(() => {
        fetch(`/api/candidate`)
            // fetch(`/api/constituency/${user_info?.constituency_id}`)
            .then(r => r.json())
            .then(r => {
                setConstituencyCandidate(r?.result)
            })
    }, [user_info?.constituency_id])

    const deleteAdmin = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this Candidate. This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/candidate/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        return response.json()
                    }).then(r => {
                        if (r?.success) {
                            Swal.fire("Deleted!", "This Candidate deleted.", "success");
                            window.location.reload()
                        } else {
                            Swal.fire(
                                "Error",
                                "There was an error deleting the Candidate.",
                                "error"
                            );
                        }
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error",
                            "There was an error deleting the Candidate.",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <div className="p-4">

            <div className="flex items-center justify-between  border-b pb-2">
                <h1 className="text-lg font-bold">Candidate List</h1>

                <a href="/dashboard/candidate/add" className="btn btn-sm rounded btn-primary text-white">
                    Add candidate
                </a>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Constituency</th>
                            <th>Candidate Name</th>
                            {/* <th>Vote</th> */}
                            <th>Party</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            constituencyCandidate?.map((r, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="font-bold">
                                                {
                                                    r?.constituency_name
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">
                                                {
                                                    r?.candidate
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">
                                                {
                                                    r?.party
                                                }
                                            </div>
                                        </td>
                                        <td className="px-3  py-4 whitespace-nowrap">
                                            <div className="flex justify-evenly">
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete"
                                                    onClick={() => deleteAdmin(r?.canid)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Candidate;