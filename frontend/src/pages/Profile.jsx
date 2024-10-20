import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const ac_token = localStorage.getItem('accessToken');
    const [user, setUser] = useState(false);
    const { id } = useParams();
    function editUser(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    async function submitForm(e) {
        e.preventDefault();
        try {
            await axios.put(`/api/update_user/${id}`, { ...user }, {
                headers: {
                    token: ac_token
                }

            });
            alert('updated success');
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
            console.log(user.data);
            setUser(user.data);
        }
        getUserInfo();
    }, [id]);

    return (
        <div className='h-screen  flex items-center justify-center ' >
            <div
                className='h-auto w-3/4 bg-white  gap-8 p-4'>
                <form onSubmit={(e) => submitForm(e)}>
                    <div className='flex gap-9 justify-center border border-solid black'  >
                        <img
                            className="h-52 mx-auto"
                            src={"http://localhost:8080/" + user.image} alt="" />
                        <label htmlFor="file">Change Image</label>
                        <input type="file" name='image' className='file' onChange={(e) => editUser(e)} />
                    </div>
                    {/* <div className='grid grid-cols-10 gap-3' >
                        
                        <div className='border border-solid col-span-4' >
                            <div className='flex ' >
                                <label htmlFor="name">Name</label>
                                <input type="text" className='name' name='name' onChange={(e) => editUser(e)} value={user.name} />
                            </div>
                            <div className='flex '>
                                <label htmlFor="email" >Email</label>
                                <input type="email" disabled className='email' name='email' onChange={(e) => editUser(e)} value={user.email} />
                            </div>
                            <div className='flex'>
                                <label for="role"  >Role</label>

                                <select disabled name="role" id="role" onChange={(e) => editUser(e)} value={user.role}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className='grid-cols-6' >
                            <label htmlFor="age" >Age</label>
                            <input type="number" className='age' name='age' onChange={(e) => editUser(e)} value={user.age} />
                            <div className='flex'>
                                <label for="address">Address</label>
                                <textarea name="address" id="address" onChange={(e) => editUser(e)} value={user.address}  ></textarea>
                            </div>
                            <div>
                                This is some random text to fill the gaps dude
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ut laborum excepturi deleniti quae, amet fugit itaque ea rerum saepe maxime ipsa iure officia, possimus distinctio. Culpa ipsum magni expedita.
                            </div>
                            <div className='flex'>
                                <label htmlFor="dob" >Date of Birth</label>
                                <input type="date" className="dob" name='dob' onChange={(e) => editUser(e)} value={user.dob} />
                            </div>
                        </div>
                    </div> */}
                    <div className='grid grid-cols-10 text-lg gap-5' >
                        <div className='border border-solid col-span-4 p-1' >
                            <div className='flex justify-between items-baseline mt-3 ' >
                                <label htmlFor="name" className='text-blue-950 font-semibold' >Name</label>
                                <input type="text" className='name bg-blue-400 p-2 text-white' name='name' onChange={(e) => editUser(e)} value={user.name} />
                            </div>
                            <div className='flex  justify-between items-baseline mt-3'>
                                <label htmlFor="email" className='text-blue-950 font-semibold' >Email</label>
                                <input type="email" disabled className='email bg-blue-400 p-2 text-white' name='email' onChange={(e) => editUser(e)} value={user.email} />
                            </div>
                            <div className='flex  justify-between items-baseline mt-3'>
                                <label for="role" className='text-blue-950 font-semibold'  >Role</label>

                                <select disabled name="role" id="role" className='bg-blue-400 p-2 text-white font-semibold' onChange={(e) => editUser(e)} value={user.role}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                            <div className='flex justify-between items-baseline mt-3'>
                                <label htmlFor="age" className='text-blue-950 font-semibold' >Age</label>
                                <input type="number" className='age bg-blue-400 p-2 text-white' name='age' onChange={(e) => editUser(e)} value={user.age} />
                            </div>
                        </div>

                        <div className='col-span-6 border border-solid p-1' >
                            <div className='mt-3'>
                                <label for="address">Address</label>
                            </div>

                            <textarea name="address" className='bg-blue-400 p-4 text-white font-semibold' id="address" cols={50} rows={6} onChange={(e) => editUser(e)} value={user.address}  ></textarea>


                            <div className='flex justify-between mt-3'>
                                <label htmlFor="dob" >Date of Birth</label>
                                <input type="date" className='bg-blue-400 p-1 text-white font-semibold' name='dob' onChange={(e) => editUser(e)} value={user.dob} />
                            </div>
                        </div>

                    </div>
                    <button type='submit' className='bg-slate-950 text-white p-2' >Submit Changes</button>
                    <button type='button' className='bg-slate-950 text-white p-2  ml-3'
                        onClick={(e) => move_back(e)}
                    >Back</button>
                </form>
            </div>
        </div >
    )
}

export default Profile