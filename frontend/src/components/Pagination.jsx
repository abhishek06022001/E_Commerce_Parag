import React from 'react';
export default function Pagination({ setPaginatedUsers, count }) {
    function iteration() {
        const row = [];
        let count_from_asc = count / 7;
        let some_num = 1;
        while (count_from_asc >= 0) {
            const new_num = some_num;
            row.push(
                <li>
                    <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        onClick={() => setPaginatedUsers(new_num)}
                    >{some_num}</a>
                </li>
            );
            count_from_asc--;
            some_num++;
        }
        return row;
    }
    return (
        <nav aria-label="Page navigation example " >
            <ul className="list-style-none flex">
                <li>
                    <a
                        className="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Previous</a>
                </li>
                {
                    iteration()
                }
                <li>
                    <a
                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                        >Next</a>
                </li>
            </ul>
        </nav>
    );
}