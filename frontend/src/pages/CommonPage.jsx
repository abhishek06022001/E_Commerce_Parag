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
                        <div className={`${darkMode ? `bg-slate-800 text-white` : `bg-slate-200 text-slate-800 `} font-semibold  sidebar min-h-full w-1/6 p-1 sm:p-0`}>
                            < Sidebar />
                        </div>
                        :
                        null
                }
                
                <div className={` ${darkMode ? `bg-slate-700` :`bg-slate-300` } flex-1 h-full  `}>


                    <Outlet  />


                </div>
            </div >
        </>
    )
}

export default CommonPage