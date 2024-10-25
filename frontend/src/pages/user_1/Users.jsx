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
    const [user, setUser] = useState({
        name: ''
    });
    async function setPaginatedUsers(skip) {
        const new_users = await axios.get(`/api/get_users?skip=${skip}`, {
            headers: {
                token: ac_token
            }
        });
        console.log(new_users);

        setLoading(false);
        setUsers(new_users.data.data);
        setCount(new_users.data.count);
    }
    function editUser(e) {
        const id = e.currentTarget.id;
        // console.log(users);


        const filtered_user = users.filter(user => {
            if (user.id == id) {
                return true;
            }

        });
        // console.log("the filtered user is", filtered_user);
        setUser(filtered_user[0]);
        console.log(filtered_user[0]);

        setIsEditing(prev => !prev);
    }
    function deleteUser(e) {

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
            className='min-h-screen h-auto   p-11 '
        >
            {loading ? <>
                <div class="spinner-3"></div>
            </> : <div className='relative w-full flex flex-col  justify-between  items-center'>
                {/* modal divs */}

                {isEditing ? <div className='modal_divs mt-5 '>
                    <div className='modal h-80 w-2/3 rounded-sm bg-white top-1/2  left-1/2 -translate-x-1/2  -translate-y-1/2 absolute z-20'>
                        <button onClick={(e) => setIsEditing(false)} >Close</button>
                        <div>
                            <input type="text" name="name" id="name" value={user.name} />
                        </div>
                        <div>
                            <input type="text" name="role" id="role" value={user.role} />
                        </div>
                    </div>
                    <div className='h-screen fixed w-screen top-0 left-0 bg-gray-900 bg-opacity-70 z-10 ' onClick={(e) => setIsEditing(false)}></div>
                </div> : null}
                <div className='w-full mt-5' >
                    <h1 className=' font-bold text-3xl text-white' >USERS</h1>
                    <div className=''>
                        {users &&
                            users.map((user, index) => {


                                return <div key={user.id} className='w-full   bg-slate-700 flex font-semibold text-lg  rounded-lg text-white' >
                                    <div className='flex-1 p-3 border solid-border' >{index + 1}</div>
                                    <div className='flex-1 p-3 border solid-border' >{user.name}</div>
                                    <div className='flex-1 p-3 border solid-border' >{user.email}</div>
                                    <div className='flex border solid-border justify-center items-center pl-4 pr-4'

                                    ><FaUserEdit id={user.id} onClick={(e) => editUser(e)} /></div>
                                    <div className='flex border solid-border justify-center items-center pl-4 pr-4'

                                    ><MdDelete id={user.id} onClick={(e) => deleteUser(e)} /></div>
                                </div>
                            })
                        }

                    </div>
                </div>
                <div className='w-full flex justify-end mt-5' >
                    <Pagination count={count} setPaginatedUsers={setPaginatedUsers} />
                </div>
            </div>}
        </div >
    )
}

export default Users