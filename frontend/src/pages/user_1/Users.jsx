import React, { useContext, useEffect, useRef, useState } from 'react'
import Pagination from '../../components/Pagination'
import axios from 'axios';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { DarkModeContext } from '../../Context/DarkModeContext';
function Users() {
    const fileRef = useRef();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const ac_token = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [count, setCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const { role } = useSelector(state => state.users_store_reducer);
    const [user, setUser] = useState({
        name: ''
    });
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
    function edit_user(e) {
        let val = e.target.value;


        if ([e.target.name] == 'file') {
            const file = e.target.files[0];
            setUser({ ...user, file: file });
        } else {
            setUser({ ...user, [e.target.name]: val });
        }
    }

    function editUser(e) {
        const id = e.currentTarget.id;
        const filtered_user = users.filter(user => {
            if (user.id == id) {
                return true;
            }
        });
        setUser(filtered_user[0]);
        setIsEditing(prev => !prev);
    }
    async function SaveChanges(e) {
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        try {
            const formData = new FormData();
            for (let key in user) {
                formData.append(key, user[key]);
            }
            fileRef.current.value = null;
            const response = await axios.post(`/api/update_user/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: ac_token
                }
            });

            const new_arr = users.map((element) => {
                if (element.id == response.data.id) {
                    return response.data;
                }
                return element;
            });
            setUsers(new_arr);
            setUser(response.data);
            setIsEditing(prev => !prev);

        } catch (error) {
            alert(error)
        }
    }
    async function deleteUser(e) {
        // delete_user
        e.preventDefault();
        const id = e.currentTarget.id;

        try {

            const response = await axios.delete(`/api/delete_user/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: ac_token
                }
            });

            const new_arr = users.filter((element) => {
                if (element.id == id) {
                    return false;
                }
                return true;
            });
            setUsers(new_arr);
            setUser(response.data);
            // setIsEditing(prev => !prev);

        } catch (error) {
            alert(error)
        }

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
        // <>hey dude</>
        <div className='min-h-screen h-screen  p-11 '>
            {loading ? <>
                <div class="spinner-3"></div>
            </> :
                <div className='relative w-full h-full  border border-s-violet-50'>
                    {/* modal divs */}
                    {isEditing ? <div className='modal_divs  '>
                        <div className='modal h-80 w-2/3 rounded-sm bg-white top-1/2  left-1/2 -translate-x-1/2  -translate-y-1/2 absolute z-20'>
                            <button onClick={(e) => setIsEditing(false)} className='bg-red-700 text-white px-2 py-0.5'  >x</button>
                            <div className='mt-1 flex gap-1 h-64 bg-slate-500' >
                                <div className='img h-full flex-1'>
                                    <img
                                        className="h-40 "
                                        src={"http://localhost:8080/" + user.image} alt="" />
                                    <label htmlFor="file">Change Image</label>
                                    <input type="file" name='file' className='file' onChange={(e) => edit_user(e)} ref={fileRef} />
                                    <div className='flex justify-between items-baseline mt-1'>
                                        <label htmlFor="age" className='text-blue-950 font-semibold' >Age</label>
                                        <input type="number" className='age p-1 text-black' name='age' onChange={(e) => edit_user(e)} value={user.age} />
                                    </div>
                                </div>
                                <div className='body bg-slate-400 p-1 flex-1'>
                                    <div className='flex justify-between items-baseline mt-1 ' >
                                        <label htmlFor="name" className='text-blue-950 font-semibold' >Name</label>
                                        <input type="text" className='name  p-1 text-black' name='name' value={user.name} onChange={(e) => edit_user(e)} />
                                    </div>
                                    <div className='flex  justify-between items-baseline mt-1'>
                                        <label htmlFor="email" className='text-blue-950 font-semibold' >Email</label>
                                        <input type="email" disabled className='email  p-1 text-black' name='email' onChange={(e) => editUser(e)} value={user.email} />
                                    </div>
                                    <div className='flex  justify-between items-baseline mt-1'>
                                        <label for="role" className='text-blue-950 font-semibold'  >Role</label>

                                        <select disabled={role == 0} name="role" id="role" className='p-1 text-black font-semibold' onChange={(e) => edit_user(e)} value={user.role}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                    <div>
                                        <textarea name="address" className='bg-blue-400 p-1 text-white font-semibold mt-1' id="address" cols={30} rows={3} onChange={(e) => edit_user(e)} value={user.address}  ></textarea>
                                    </div>
                                    <div >
                                        {/* <button className='bg-black text-white p-2'>View Order History</button> */}
                                        <button className='bg-black text-white p-2'
                                            onClick={(e) => SaveChanges(e)} data-id={user.id}
                                        >Save Changes</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='h-screen fixed w-screen top-0 left-0 bg-gray-900 bg-opacity-70 z-10 ' onClick={(e) => setIsEditing(false)}></div>
                    </div> : null}
                    <div className='flex  flex-col h-full justify-between' >
                        <div className='w-full mt-5 ' >
                            <h1 className=' font-bold text-3xl text-white' >USERS</h1>
                            <div className=''>
                                {users &&
                                    users.map((user, index) => {
                                        return <div key={user.id} className='w-full mt-3 mb-3   bg-slate-700 flex font-semibold text-lg  rounded-lg text-white' >
                                            {/* <div className='flex-1 p-3 border solid-border' >{(index) + 1}</div> */}
                                            <div className='flex-1 p-3 border solid-border' >{user.name}</div>
                                            <div className='flex-1 p-3 border solid-border' >{user.email}</div>
                                            <div className='flex border solid-border justify-center items-center pl-4 pr-4'
                                            ><FaUserEdit id={user.id} onClick={(e) => editUser(e)} /></div>
                                            <div className='flex border solid-border justify-center items-center pl-4 pr-4'><MdDelete id={user.id} onClick={(e) => deleteUser(e)} /></div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='w-full  justify-end ' >
                            <Pagination count={count} setPaginatedUsers={setPaginatedUsers} />
                        </div>
                    </div>
                </div>}
        </div >
    )
}

export default Users