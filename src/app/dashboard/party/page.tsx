"use client";
import { useEffect, useState } from "react";

const Party = () => {
    const [party, setParty] = useState<any[]>([])

    useEffect(() => {
        fetch(`/api/party`)
            .then(r => r.json())
            .then(r => {
                setParty(r?.result)
            })
    }, [])


    return (
        <div>
            <div className="m-5 p-5 border shadow-xl">
                <div>
                    <h2>Party {party?.length}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Party ID
                                </th>
                                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Party
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {party?.map((user: any, index: number) => (
                                <tr key={index}>

                                    <td className="px-3 py-4 whitespace-nowrap">
                                        {user.party_id}
                                    </td>

                                    <td className="px-3 py-4 whitespace-nowrap">
                                        {user.party}
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

export default Party;
