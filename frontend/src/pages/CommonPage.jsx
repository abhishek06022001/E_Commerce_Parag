import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function CommonPage() {
    const menu = true;
    return (
        <div className='flex  min-h-screen '>
            {/* sidebar */}
            {menu ?

                <div
                    className='bg-slate-800 min-h-full sm:w-1/5 w-2/5 p-1 sm:p-0    '
                >
                    <Sidebar />
                </div>
                :
                null}

            {/* viewBoz */}
            <div
                className='bg-slate-300  h-full flex-1'
            >  <Outlet /> </div>
        </div>
    )
}

export default CommonPage