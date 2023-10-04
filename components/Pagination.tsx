import { cls } from '@libs/client/utils';
import React from 'react';

interface PaginationProps {
    totalCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ totalCount, currentPage, setCurrentPage }: PaginationProps) => {
    const pageCount = 5;
    const totalPage = Math.ceil(totalCount / 20);
    const pageGroup = Math.ceil(currentPage / pageCount);
    let lastNum = pageGroup * 5;
    if (lastNum > totalPage) lastNum = totalPage;
    const firstNum = lastNum - (pageCount - 1);

    const prevPage = () => {
        setCurrentPage(firstNum - 1);
    };
    const nextPage = () => {
        setCurrentPage(lastNum + 1);
    };

    const movePage = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        setCurrentPage(+target.innerText);
    };

    return (
        <div className='relative z-50 flex w-[80%] justify-between pl-4'>
            {firstNum - 1 > 0 && <button onClick={prevPage}>이전</button>}

            {Array.from({ length: 5 }).map((_, i) => (
                <button
                    key={i}
                    onClick={movePage}
                    className={cls(
                        'rounded-sm py-2 px-3',
                        +currentPage === firstNum + i ? 'bg-blue-100' : 'cursor-pointer'
                    )}>
                    {firstNum + i}
                </button>
            ))}

            {lastNum < totalPage && <button onClick={nextPage}>다음</button>}
        </div>
    );
};

export default Pagination;