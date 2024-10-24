import { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
function CommonPage() {
    const menu = true;
    // menu part will be only checked here dude from redux .
    useEffect(() => {
    }, []);
    return (
        <>
            <div className='flex  min-h-screen   '>
                {
                    menu ?
                        <div className='bg-slate-800 min-h-full sm:w-1/5 w-2/5 p-1 sm:p-0'>
                            < Sidebar />
                        </div>
                        :
                        null
                }
                {/* background color that needs to be changed in theme change */}
                <div className='bg-slate-500 h-full flex-1'>


                    <Outlet />


                </div>
            </div >
        </>
    )
}

export default CommonPage