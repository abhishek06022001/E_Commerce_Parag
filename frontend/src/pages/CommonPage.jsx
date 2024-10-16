

import { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function CommonPage() {
    const menu = true;
    // handle menu in redux toolkit 
    // ok and will fetch the details from the backend api and then i will remove the timer keep the timers adjusted ok 
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1200);
    }, []);
    return (

        <>
            {loading ?
                <div className='text-center flex  flex-col justify-center items-center h-screen bg-slate-800 '>
                    <div className="spinner-3"></div>
                </div>
                :
                <div className='flex  min-h-screen   '>
                    {
                        menu ?
                            <div
                                className='bg-slate-800 min-h-full sm:w-1/5 w-2/5 p-1 sm:p-0    '
                            >
                                < Sidebar />
                            </div>
                            :
                            null
                    }
                    <div
                        className='bg-slate-300  h-full flex-1'
                    >  <Outlet /> </div>
                </div >
            }
        </>


    )
}

export default CommonPage