'use client'
/* eslint-disable @next/next/no-img-element */
import Loading from '@/components/common/Loading';
import React, { useRef, useState } from 'react';
import DesktopSidebar from './DashboardComponent/DesktopSidebar';
import Header from './DashboardComponent/Header';
import { CheckRouter } from './DashboardComponent/sideLink';


export default function Template(props: {
    children: React.ReactNode,
}) {

    const [check, setCheck] = useState<boolean>(false)

    CheckRouter().then(r => {
        if (r?.link) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
    })

    const sidebarRef = useRef<any>();

    // const { user_info, role }: any = useContext(AuthenticationCheck)


    const fullSmallSidebarHandle = () => {
        const sidebar = sidebarRef.current
        if (sidebar.className == 'desktopSidebar small-sidebar') {
            sidebar.className = 'desktopSidebar '
        }
        else {
            sidebar.className = 'desktopSidebar small-sidebar'
        }
    }

    // const sendEmail = async () => {
    //     const res = await fetch(confirm_email_api, {
    //         method: "POST",
    //         body: JSON.stringify({ id: user_info?.vendorID || user_info?.customerID, name: user_info?.name })
    //     })
    //     await res?.json().then(r => {
    //         toast.success('Please check your email !')
    //     })

    // }

    return (
        <>
            {/* <head>
                <title>
                    {
                        Path_breadcrumbs() ? `Dashboard > ${Path_breadcrumbs()?.html?.join('/')?.replaceAll('/', ' > ')}` : 'Dashboard'
                    }
                </title>
            </head> */}
            <main className='flex h-screen' >
                <input
                    type="radio"
                    name="selected-menu"
                    id="sideNavMobile" className="menu--selector "
                />



                <section className='flex flex-col w-full flex-shrink flex-grow '>
                    <Header />
                    <div className='overflow-hidden h-full px-2 overflow-y-auto relative'>
                        {
                            check ?
                                props.children
                                :
                                <Loading />
                        }
                    </div>
                </section>

                <aside className='desktopSidebar ' ref={sidebarRef} >
                    <DesktopSidebar />
                    <div className='bottom-0 left-0 flex justify-end items-center absolute'>
                        <button onClick={fullSmallSidebarHandle} className='hidden lg:inline-block click-side-btn rotate-180' >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="20" height="20"
                                viewBox="6 6 30 30" className='w-8 h-8'>
                                <path d="m20.328 20.41 3.233-3.275v-1.522l-.201-.205h-1.504l-4.796 4.848v.288l4.801 4.864h1.5l.2-.205v-1.517l-3.233-3.276Z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </aside>
            </main>
        </>
    );
};
