import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
    return (
        <div
            className='text-center w-full h-full text-white  md:p-5 lg:p-10 flex flex-col gap-1'
        >
           <div>
                <Link to={'/login'}>
                    <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Login</h1>
                </Link>
           </div>
           <div>
                <Link to={'/signup'}>
                    <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Register</h1>
                </Link>
           </div>
        </div>
    )
}

export default Sidebar