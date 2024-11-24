'use client'
import { useEffect, useState } from 'react';

const ElectionResults = () => {
    const [results, setResults] = useState<any>([])

    useEffect(() => {
        fetch(`/gevs/results`)
            .then(r => r.json())
            .then(r => {
                setResults(r)
            })
    }, [])

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Election Results</h1>
            <p className="mb-2">Status: {results?.status}</p>
            <p className="mb-2">Winner: {results?.winner}</p>

            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 p-2">Party</th>
                        <th className="border border-gray-200 p-2">Seats</th>
                    </tr>
                </thead>
                <tbody>
                    {results?.seats?.map((seat: any, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-200 p-2">{seat?.party}</td>
                            <td className="border border-gray-200 p-2">{seat?.seat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ElectionResults;
