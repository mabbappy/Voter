
const Pagination = ({ pageHandle = () => { }, currentPage, getLastPage }: { pageHandle: any, currentPage: any, getLastPage: any }) => {
    const page = parseInt(currentPage)
    const lastPage = parseInt(getLastPage)
    return (
        <div className='PaginationMainDiv'>
            <div className="button-group">

                {
                    //  CASE: 01 AND 02
                    page > 3 &&
                    <>
                        <button
                            onClick={() => pageHandle(1)}
                            className="button buttonPage"
                        >
                            {1}
                        </button>

                        <button
                            onClick={() => pageHandle(2)}
                            className="button buttonPage"

                        >
                            {2}
                        </button>
                        {/* ********************* */}
                        {
                            // CASE: 03
                            page == 4 ||
                            <button
                                onClick={() => pageHandle(3)}
                                className="button buttonPage"
                            >
                                {3}
                            </button>
                        }
                        {/* ********************** */}
                        {
                            // CASE: 04
                            page > 5 &&
                            <button
                                className="button buttonPage"
                            >
                                ...
                            </button>
                        }
                    </>
                }
                {/* 

                    O5. WHEN PAGE > 1 => BUTTON SHOW (page - 1);

                */}

                {
                    // CASE: 05
                    page > 1 &&
                    <button
                        onClick={() => pageHandle(page - 1)}
                        className="button buttonPage"
                    >
                        {page - 1}
                    </button>
                }

                {/* *******CURRENT PAGE AND DISABLE BUTTON********** */}
                <button
                    className="button buttonDisable"
                >
                    {page}
                </button>

                {/* 

                    1.  WHEN PAGE == LAST PAGE OR PAGE == LAST PAGE -3 => FALSE THEN THIS BUTTON SHOW....

                */}
                {
                    //CASE: 06;
                    page == lastPage || page == lastPage - 3 ||
                    <>
                        <button
                            onClick={() => pageHandle(page + 1)}
                            className="button buttonPage"
                        >
                            {page + 1}
                        </button>

                        {/* 
                            1.  WHEN PAGE >= LAST PAGE - 2 OR PAGE == LAST PAGE - 4 => FALSE THEN THIS BUTTON SHOW
                        
                        */}
                        {
                            //CASE: 07
                            page >= lastPage - 2 || page == lastPage - 4 ||
                            <button
                                className='button buttonDisable'
                            >
                                ...
                            </button>
                        }
                    </>
                }

                {
                    page < lastPage - 2 &&
                    <>
                        <button
                            onClick={() => pageHandle(lastPage - 2)}
                            className="button buttonPage"
                        >
                            {lastPage - 2}
                        </button>
                        <button
                            onClick={() => pageHandle(lastPage - 1)}
                            className="button buttonPage"
                        >
                            {lastPage - 1}
                        </button>
                        <button
                            onClick={() => pageHandle(lastPage)}
                            className="button buttonPage"
                        >
                            {lastPage}
                        </button>

                    </>
                }
                {
                    lastPage - 2 == page &&
                    <button
                        onClick={() => pageHandle(lastPage)}
                        className="button buttonPage"
                    >
                        {lastPage}
                    </button>
                }

            </div>
        </div>
    );
};

export default Pagination;