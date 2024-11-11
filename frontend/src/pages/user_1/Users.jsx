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
    const [del, setDel] = useState(false);
    const ac_token = localStorage.getItem('accessToken');
    async function delete_by_id(id) {
        try {
            const response = await axios.delete(`/api/delete_user/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: ac_token
                }
            });
            fetchUsers();
        } catch (error) {
            alert(error)
        }
    }
    async function fetchUsers() {
        const new_users = await axios.get(`/api/get_users?skip=${page}&name=${query}`, {
            headers: {
                token: ac_token
            }
        });
        setUsers(new_users.data.data);
        setCount(new_users.data.count);
    };
    useEffect(() => {
        fetchUsers();
    }, [page, query]);
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
                {users && users.map((user, index) => {
                    return <UserEntry key={user.id}
                        setUsers={setUsers} users={users}
                        index={index + 1} user={user} page={page} delete_by_id={delete_by_id} />
                })}
            </div>
            <div className='flex justify-center ' >
                <Pagination_new count={count} page={page} setPage={setPage} />
            </div>

        </div >
    )
}

export default Users