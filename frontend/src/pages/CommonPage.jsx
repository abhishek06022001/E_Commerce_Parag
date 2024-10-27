import { useContext, useEffect, useState } from "react";
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { DarkModeContext } from "../Context/DarkModeContext.jsx";
// import { darkMode } from '../Context/DarkModeContext'
function CommonPage() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const menu = true;
    // menu part will be only checked here dude from redux .
    useEffect(() => {
    }, []);
    return (
        <>
            <div className='flex  min-h-screen   '>
                {
                    menu ?
                        <div className={`${darkMode ? `bg-slate-800 text-white` : `bg-slate-200 text-black`}  sidebar min-h-full w-1/6 p-1 sm:p-0`}>
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