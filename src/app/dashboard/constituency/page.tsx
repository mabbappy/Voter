"use client";
import { useEffect, useState } from "react";

const Constituency = () => {
    const [constituency, setConstituency] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/constituency`)
            .then(r => r.json())
            .then(r => {
                setConstituency(r?.result)
            })
    }, [])


    return (
        <div>
            <div className="m-5 p-5 border shadow-xl">
                <div>
                    <h2>Constituency {constituency?.length}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Constituency ID
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Constituency
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {constituency?.map((user: any, index: number) => (
                                <tr key={index}>

                                    <td className="px-3 py-4 whitespace-nowrap">
                                        {user.constituency_id}
                                    </td>

                                    <td className="px-3 py-4 whitespace-nowrap">
                                        {user.constituency_name}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default Constituency;
