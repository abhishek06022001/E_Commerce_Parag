import React from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

function UserEntry({ user, index, page }) {
    let sr_num = 6*(page-1)+index;
    return (
        <div className=' h-11 mb-2 grid grid-cols-8 gap-3'>
            <div className='col-span-1 flex justify-center items-center border border-solid border-black bg-slate-300' >
                {sr_num}
            </div>
            <div className='col-span-2 flex justify-center items-center border border-solid border-black bg-slate-300 ' >
                {user.name}
            </div>
            <div className='col-span-3 border flex items-center px-4 border-solid border-black bg-slate-300 overflow-x-auto '>
                {user.email}
            </div>
            <div className='col-span-2 flex justify-evenly items-center border border-solid border-black bg-slate-300' >
                <button><FaUserEdit size={40} /></button>
                <button><MdDelete size={40} /></button>
            </div>
        </div>
    )
}

export default UserEntry