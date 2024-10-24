import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination'
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function Users() {
    const ac_token = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [count, setCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    async function setPaginatedUsers(skip) {
        const new_users = await axios.get(`/api/get_users?skip=${skip}`, {
            headers: {
                token: ac_token
            }
        });
        setLoading(false);
        setUsers(new_users.data.data);
        setCount(new_users.data.count);
    }
    function editUser(e) {
        setIsEditing(true);
        alert(e.target.id);
    }
    function deleteUser(e) {
        alert(e.target.id);
    }
    useEffect(() => {
        async function getUsers() {
            const new_users = await axios.get('/api/get_users', {
                headers: {
                    token: ac_token
                }
            });
            setLoading(false);
            setUsers(new_users.data.data);
            setCount(new_users.data.count);
        }
        getUsers();
    }, []);
    return (
        <div
            className='h-screen  flex flex-col justify-between items-center p-11 '
        >



            {loading ? <>
                <div class="spinner-3"></div>
            </> : <>
                <div className='w-full' >
                    <h1 className=' font-bold text-3xl text-white' >USERS</h1>
                    <div className=''>
                        {users &&
                            users.map((user, index) => {


                                return <div key={user.id} className='w-full   mt-8 mb-8 bg-slate-700 flex font-semibold text-lg  rounded-lg text-white' >
                                    <div className='flex-1 p-3 border solid-border' >{index + 1}</div>
                                    <div className='flex-1 p-3 border solid-border' >{user.name}</div>
                                    <div className='flex-1 p-3 border solid-border' >{user.email}</div>
                                    <div className='flex border solid-border justify-center items-center pl-4 pr-4'
                                        id={user.id} onClick={(e) => editUser(e)}
                                    ><FaUserEdit /></div>
                                    <div className='flex border solid-border justify-center items-center pl-4 pr-4'
                                        id={user.id} onClick={(e) => deleteUser(e)}
                                    ><MdDelete /></div>
                                </div>
                            })
                        }

                    </div>
                </div>
                <div className='w-full flex justify-end' >
                    <Pagination count={count} setPaginatedUsers={setPaginatedUsers} />
                </div>
            </>}
        </div>
    )
}

export default Users