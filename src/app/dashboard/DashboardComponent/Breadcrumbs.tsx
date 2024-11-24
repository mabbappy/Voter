'use client'
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
export function Path_breadcrumbs() {

    const pathname = usePathname();
    const params = useParams()
    const { productID, vendorUsername, userEmail, order_id, categoryID } = params;

    const path_check = [
        {
            path: '/messages',
            html: ["Dashboard"],
            link: [''],
        },

    ]
    const check: any = path_check?.find(r => r?.path === pathname);
    return check

}
const Breadcrumbs = () => {

    return (
        <div>
            <ol className="flex items-center gap-1 text-sm text-gray-600">
                <li>
                    <a href="/dashboard" className="block transition hover:text-gray-700">
                        <span className="sr-only"> Home </span>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15.5 18L9.5 12L15.5 6" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </a>
                </li>
                {
                    Path_breadcrumbs()?.html?.map((p: any, index: number) => {
                        return (
                            <li className="rtl:rotate-180 flex items-center gap-1" key={index}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <li>
                                    {
                                        Path_breadcrumbs()?.link[index] ?
                                            <a href={Path_breadcrumbs()?.link[index]} className="block hover:underline transition hover:text-gray-700">
                                                {
                                                    p
                                                }
                                            </a>
                                            :
                                            <p>
                                                {
                                                    p
                                                }
                                            </p>
                                    }

                                </li>

                            </li>

                        )
                    })
                }

            </ol>
        </div>
    );
};

export default Breadcrumbs;