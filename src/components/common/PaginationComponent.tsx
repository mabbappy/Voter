'use client'
import React from 'react';
import Pagination from './Pagination';
import QueryNavigation from '@/hooks/QueryNavigation';

const PaginationComponent = ({ last_page, page, name }: { last_page: number | any, page: any, name: string }) => {
    const navigateQuery = QueryNavigation()
    return (
        <div className='flex gap-1 pt-4 justify-end mb-2 px-4'>
            <Pagination getLastPage={!Boolean(last_page) ? 1 : last_page} currentPage={page ? page : 1} pageHandle={(page: string) => {
                navigateQuery([{
                    name: name,
                    value: page
                }])
            }} />
        </div>
    );
};

export default PaginationComponent;