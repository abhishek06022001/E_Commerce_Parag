import React, { useContext, useEffect, useRef, useState } from 'react'
import Pagination from '../../components/Pagination'
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { DarkModeContext } from '../../Context/DarkModeContext';
import Pagination_new from './Pagination_new';
import UserEntry from './UserEntry';
function Users() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [count, setCount] = useState(null);
    const ac_token = localStorage.getItem('accessToken');
    // useRef to link name of
    useEffect(() => {
        async function fetchUsers() {
            // let name = 'Abhi';
            // fetch the users here for page 1 , or skip is 0
            console.log("The searched data is", query); 
            const new_users = await axios.get(`/api/get_users?skip=${page}&name=${query}`, {
                headers: {
                    token: ac_token
                }
            });
            

            setUsers(new_users.data.data);
            setCount(new_users.data.count);
        };
        fetchUsers();
    }, [page, query]);
    // now write some query changing state here
    return (

        <div className='min-h-screen h-auto p-11  '>
            <h1 className='flex justify-between  mb-4' >
                <span className='text-2xl font-medium text-white  ' >Users Table</span>
                <span><input type="text" className='px-4 bg-white text-black p-2 rounded-sm  w-96'
                    placeholder='search by username'
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                /></span>
            </h1>
            <div className='relative  h-[500px] border-collapse'>
                <div
                    className=' h-11 mb-2 grid grid-cols-8 gap-3'>
                    <div className='col-span-1 flex justify-center items-center border border-solid border-black bg-slate-300' >SR NO.</div>
                    <div className='col-span-2 flex justify-center items-center border border-solid border-black bg-slate-300' >NAME</div>
                    <div className='col-span-3 flex justify-center items-center border border-solid border-black bg-slate-300' >EMAIL</div>
                    <div className='col-span-2 flex justify-center items-center border border-solid border-black bg-slate-300' >ACTIONS</div>
                </div>
                {users.map((user, index) => {
                    return <UserEntry index={index + 1} user={user} page={page} />
                })}

            </div>
            <div className='flex justify-center ' >
                <Pagination_new count={count} page={page} setPage={setPage} />
            </div>

        </div >
    )
}

export default Users