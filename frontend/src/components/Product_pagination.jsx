import React from 'react'

function Product_pagination({count,page,setCount,setPage}) {
    let startNum = 1;
    let lastNum = Math.ceil(count / 6);
    let page_arr = [];
    while (startNum <= lastNum) {
        page_arr.push(startNum);
        startNum++;
    }
    return (
        <div className='flex gap-5' >
            <button className='text-white mx-5 hover:text-red-600'
                onClick={(e) => {
                    if (page !== 1) {
                        setPage(page - 1);
                    }
                }}
            >Back</button>
            {page_arr.map(num => {
                return <button className={` p-4 ${page === num ? ` text-white bg-red-600` : `bg-white text-red-600`}  `}

                    onClick={(e) => {
                        setPage(num);
                    }}
                >{num}</button>
            })}
            <button className='text-white mx-5 hover:text-red-600'
                onClick={(e) => {
                    if (page !== lastNum) {
                        setPage(page + 1);
                    }
                }}
            >Next</button>
        </div >
    )
}

export default Product_pagination