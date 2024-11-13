import axios from 'axios';
import React, { useRef, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
function UserEntry({ user, index, page, delete_by_id, setUsers, users }) {
    const [edit, setEditModal] = useState(false);
    const segmented_users = users;
    const ac_token = localStorage.getItem('accessToken');
    const [delete_modal, setDeleteModal] = useState(false);
    const [editUserInfo, setEditUser] = useState(user);
    let sr_num = 6 * (page - 1) + index;
    const fileRef = useRef();
    function changeUser(e) {
        if ([e.target.name] == 'file') {
            const file = e.target.files[0];
            setEditUser({ ...editUserInfo, file: file });
        } else {
            setEditUser({ ...editUserInfo, [e.target.name]: e.target.value });
        }
    }
    async function edit_user(e) {
        //  only backend p needed
        e.preventDefault();
        const id = e.currentTarget.getAttribute('data-id');
        try {
            const formData = new FormData();
            for (let key in editUserInfo) {
                formData.append(key, editUserInfo[key]);
            }
            fileRef.current.value = null;
            const response = await axios.post(`/api/update_user/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: ac_token
                }
            });


            const new_updated_users = segmented_users.map((some_user) => {
                if (some_user.id == response.data.id) {
                    return response.data;
                }
                return some_user;
            });
            setUsers([...new_updated_users]);
            setEditUser({ ...response.data });
            setTimeout(() => {
                setEditModal(false);
            }, 500)
            // 
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
            {/* modal */}
            {(edit || delete_modal) &&
                <div className='
            fixed
            bg-slate-900 top-0 left-0 opacity-70
              h-screen w-screen' ></div>
            }
            {edit &&
                <div className='absolute h-[560px] w-[500px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white z-10 
                rounded-lg
                ' >
                    <div className='flex gap-2 items-center'>
                        <span className='bg-red-600 p-5 text-white w-fit flex justify-center  rounded-t-lg rounded-r-none items-center text-xl'
                            onClick={() => { setEditModal(false); setEditUser(user) }}
                        >x</span>
                        <span className='text-2xl font-medium'>EDIT USER INFORMATION</span>
                    </div>
                    <div className='p-4'>
                        <div className='flex ' >
                            <img
                                className="h-20 "

                                src={"http://localhost:8080/" + editUserInfo.image} alt="" />
                            <input type="file" name='file' className='file'
                                onChange={(e) => changeUser(e)} ref={fileRef} />
                        </div>
                        <div className='bg-slate-200 rounded-md m-1 p-1' >
                            <div className='p-1 text-xl font-medium '>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className='p-1  '>
                                <input type="text" name='name'
                                    onChange={(e) => changeUser(e)}
                                    className='w-full h-10' value={editUserInfo.name} placeholder='Name here' />
                            </div>
                        </div>
                        <div className='bg-slate-200 rounded-md m-1 p-1' >
                            <div className='p-1 text-xl font-medium '>
                                <label htmlFor="name" >Role</label>
                            </div>
                            <div className='p-1  '>
                                <select value={editUserInfo.role}
                                    onChange={(e) => changeUser(e)}
                                    name="role" id="role" className='p-1 text-black font-semibold'  >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                        </div>
                        <div className='bg-slate-200 rounded-md m-1 p-1' >
                            <div className='p-1 text-xl font-medium '>
                                <label htmlFor="name" >Address</label>
                            </div>
                            <div className='p-1  '>
                                <textarea name="address"
                                    onChange={(e) => changeUser(e)}
                                    className='font-semibold mt-1' id="address"
                                    cols={50} rows={3} value={editUserInfo.address}></textarea>

                            </div>
                        </div>
                        <button
                            className='bg-black py-3 m-1 rounded-md  text-white px-5'
                            onClick={(e) => edit_user(e)}
                            data-id={user.id}
                        >save changes</button>

                    </div>

                </div>
            }
            {delete_modal &&
                <div className='absolute h-auto w-auto top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-5 bg-white z-10 
                
                ' >
                    <div className='text-2xl font-medium ' >  Are you sure that you want to delete this User ? </div>
                    <button
                        className='bg-black text-white p-3 px-5 m-5 mx-0'
                        onClick={() => delete_by_id(editUserInfo.id)}
                    >Yes</button>
                    <button
                        className='bg-black text-white p-3 px-5 m-5 '
                        onClick={() => setDeleteModal(false)}
                    >No</button>
                </div>
            }
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
                    <button
                        data-id={editUserInfo.id}
                        onClick={(e) => setEditModal(true)}
                    ><FaUserEdit size={40} /></button>
                    <button
                        data-id={editUserInfo.id}
                        onClick={(e) => setDeleteModal(true)}
                    ><MdDelete size={40} /></button>
                </div>
            </div>
        </>

    )
}

export default UserEntry