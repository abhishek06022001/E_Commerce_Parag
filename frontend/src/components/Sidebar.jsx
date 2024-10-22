import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/user/userSlice';
import { store } from '../store/store';
function Sidebar() {
    const { role, id } = useSelector(state => state.users_store_reducer);
    const user_info = useSelector(state => state.users_store_reducer);
    // console.log(user_info);

    const is_logged_in = localStorage.getItem('accessToken');
    const navigate = useNavigate('');
    function logout() {
        localStorage.removeItem('accessToken');
        store.dispatch(logoutUser());
        navigate('/');
    }
    return (
        <div
            className='text-center w-full h-full text-white  md:p-5 lg:p-10 flex flex-col gap-1'
        >
            <div>
                <Link to={''}>
                    <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Products Listing</h1>
                </Link>
            </div>
            {is_logged_in ?
                <>
                    <div>
                        <Link to={`/profile/${id}`}>
                            <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Profile</h1>
                        </Link>
                    </div>
                    {(role == 1) ?
                        <>

                            <div>
                                <Link to={'/users'}>
                                    <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Users</h1>
                                </Link>
                            </div>

                        </>
                        :

                        <>
                            <div>
                                <Link to={'/order_history'}>
                                    <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Order History</h1>
                                </Link>
                            </div>

                        </>
                    }
                    <div>
                        <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'
                            onClick={() => logout()}
                        >Logout</h1>
                    </div>

                </>
                :
                <>
                    <div>
                        <Link to={'/login'}>
                            <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Login</h1>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/signup'}>
                            <h1 className='text-lg  lg:p-3 p-1 border border-solid-white'>Register</h1>
                        </Link>
                    </div>
                </>}
        </div>
    )
}

export default Sidebar