import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/user/userSlice';
import { placeOrder } from '../features/cart/cartSlice';
import { store } from '../store/store';
import { DarkModeContext } from '../Context/DarkModeContext';
function Sidebar() {
    const { role, id } = useSelector(state => state.users_store_reducer);
    const user_info = useSelector(state => state.users_store_reducer);

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const is_logged_in = localStorage.getItem('accessToken');
    const navigate = useNavigate('');
    function logout() {
        localStorage.removeItem('accessToken');
        store.dispatch(logoutUser());
        store.dispatch(placeOrder());
        navigate('/');
    }
    return (
        <>
            <div
                className='text-center w-full h-full  md:p-2 lg:p-3 flex flex-col gap-1'
            >
                <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}
                    onClick={() => toggleDarkMode()}
                >Change Theme</h1>

                <div>
                    <Link to={''}>
                        <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}>Products Listing</h1>
                    </Link>
                </div>
                {is_logged_in ?
                    <>
                        <div>
                            <Link to={`/profile/${id}`}>
                                <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}>Profile</h1>
                            </Link>
                        </div>
                        {(role == 1) ?
                            <>

                                <div>
                                    <Link to={'/users'}>
                                        <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}>Users</h1>
                                    </Link>
                                </div>

                            </>
                            :

                            <>
                                <div>
                                    <Link to={`/order_history/${id}`}>
                                        <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}>Order History</h1>
                                    </Link>
                                </div>

                            </>
                        }
                        <div>
                            <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}
                                onClick={() => logout()}
                            >Logout</h1>
                        </div>

                    </>
                    :
                    <>
                        <div>
                            <Link to={'/login'}>
                                <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}>Login</h1>
                            </Link>
                        </div>
                        <div>
                            <Link to={'/signup'}>
                                <h1 className={`text-lg  lg:p-3 p-1 ${darkMode ? `border border-solid ` : ` bg-slate-200 border border-solid border-black`} `}>Register</h1>
                            </Link>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Sidebar