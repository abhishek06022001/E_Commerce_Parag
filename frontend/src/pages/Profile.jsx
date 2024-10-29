import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { DarkModeContext } from '../Context/DarkModeContext';

function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const ac_token = localStorage.getItem('accessToken');
    const [user, setUser] = useState({
        file: ''
    });
    const { id } = useParams();
    const fileRef = useRef();
    function editUser(e) {
        let val = e.target.value;


        if ([e.target.name] == 'file') {
            const file = e.target.files[0];
            setUser({ ...user, file: file });
        } else {
            setUser({ ...user, [e.target.name]: val });
        }
    }
    async function submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key]);
        }
        fileRef.current.value = null;
        try {
            const response = await axios.post(`/api/update_user/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: ac_token
                }
            });
            setUser(response.data);

        } catch (error) {
            alert("some Error occured :( ");
        }
    }
    function move_back(e) {
        e.preventDefault();
        navigate('/');
    }
    useEffect(() => {
        async function getUserInfo() {
            const user = await axios.get(`/api/get_user/${id}`, {
                headers: {
                    token: ac_token
                }
            });


            setUser(user.data[0]);
        }
        getUserInfo();
    }, [id]);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    return (
        <div className='min-h-screen h-auto  ' >
            <div
                className={`${darkMode ? `bg-slate-600` : `bg-white`} bg-white text-black h-auto mx-auto my-10 w-3/4 gap-8 p-4`}>
                <form onSubmit={(e) => submitForm(e)} method="post" enctype="multipart/form-data">
                    <div className=' gap-9 mx-auto black'  >
                        <img
                            className="h-52 mx-auto rounded-full  border-4 border-slate-500 "
                            src={"http://localhost:8080/" + user.image} alt="" />
                        <div>
                            <label htmlFor="file">Change Image</label>
                            <input type="file" name='file' className='file' onChange={(e) => editUser(e)} ref={fileRef} />
                        </div>
                    </div>
                    <div className=' text-lg gap-5' >
                        <div className='  grid grid-cols-2  gap-1' >
                            <div className=' col-span-1'>
                                <div className='flex justify-between items-baseline mt-3  bg-slate-200 p-3 rounded-sm ' >
                                    <label htmlFor="name" className='text-black font-semibold ' >Name</label>
                                    <input type="text" className='name p-2 text-black bg-slate-300 rounded-sm' name='name' value={user.name} onChange={(e) => editUser(e)} />
                                </div>
                                <div className='flex  justify-between items-baseline mt-3 text-black  bg-slate-200 p-3 my-1 rounded-sm'>
                                    <label htmlFor="email" className=' font-semibold' >Email</label>
                                    <input type="email" disabled className='email  p-2 bg-slate-300  rounded-sm' name='email' onChange={(e) => editUser(e)} value={user.email} />
                                </div>
                            </div>
                            <div className=' col-span-1'>
                                <div className='flex  justify-between items-baseline mt-3  bg-slate-200 p-3 rounded-sm'>
                                    <label for="role" className='text-black font-semibold'  >Role</label>
                                    <select disabled name="role" id="role" className='p-2 text-black font-semibold' onChange={(e) => editUser(e)} value={user.role}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                    </select>

                                </div>
                                <div className='flex justify-between items-baseline mt-3  bg-slate-200 p-3 rounded-sm
                            '>
                                    <label htmlFor="age" className='text-black font-semibold' >Age</label>
                                    <input type="number" className='age  bg-slate-300 p-2 text-black rounded-sm' name='age' onChange={(e) => editUser(e)} value={user.age} />
                                </div>
                            </div>
                        </div>
                        <div className='  bg-slate-200  p-3 rounded-sm' >
                            <div className='mt-3 font-semibold text-black'>
                                <label for="address ">Address</label>
                            </div>
                            <textarea
                                name="address"
                                className='w-full p-4 text-black rounded-sm bg-slate-300 ' // Added w-full
                                id="address"
                                cols={60}
                                rows={6}
                                onChange={(e) => editUser(e)}
                                value={user.address}
                            ></textarea>

                            <div className='flex gap-10 mt-3'>
                                <label htmlFor="dob" className='font-semibold text-black' >Date of Birth</label>
                                <input type="date" className=' p-1 text-black font-semibold' name='dob' onChange={(e) => editUser(e)} value={user.dob} />
                            </div>
                        </div>

                    </div>
                    <div className='mt-2'>
                        <button type='submit' className='bg-slate-950 text-white p-2' >Submit Changes</button>
                        <button type='button' className='bg-slate-950 text-white p-2  ml-3'
                            onClick={(e) => move_back(e)}
                        >Back</button>
                    </div>

                </form>
            </div>
        </div >
    )
}

export default Profile