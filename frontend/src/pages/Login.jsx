import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { logUser } from '../features/user/userSlice';
import useLoggedIn from '../customHook/useLoggedIn';
import { store } from '../store/store';
function Login() {
    const navigate = useNavigate('');
    const [bool] = useLoggedIn();


    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (bool) {
            navigate('/');
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [bool]);
    const [input, setInput] = useState({
        email: '', password: ''
    });

    function handleChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const secretKey = 'JWT_SECRET_KEY';
    async function login(e) {
        e.preventDefault();
        try {
            const ac_token = await axios.post('/api/login', input);
            localStorage.setItem('accessToken', ac_token.data.message);
            setLoading(true);
            setInput({ email: '', password: '' });
            const { id } = jwtDecode(ac_token.data.message);
            const user_info = await axios.get('/api/get_user/' + id, {
                headers: {
                    token: ac_token.data.message
                }
            });
            user_info.data = { ...user_info.data[0], id: id };
          
            store.dispatch(logUser(user_info.data))
            navigate('/');
        } catch (error) {
            console.log(error.message);
            setInput({ email: '', password: '' });
            alert("Failed Login")
        }
        // call an api and set localstorage with the 
    }
    return (
        <div className='text-center flex  flex-col justify-center items-center h-screen bg-slate-800 '>
            {loading ?
                <div class="spinner-3"></div>
                :
                <div
                    className=' bg-slate-300  login md:w-96 w-80
                pt-8 pb-8
                '
                >
                    <div className='font-bold text-black text-4xl m-3' >
                        Login Page
                    </div>
                    <form onSubmit={e => login(e)}>
                        <div>
                            <input type="text"
                                required
                                onChange={(e) => handleChange(e)}
                                value={input.email}

                                className='w-4/5 p-2 rounded-sm m-3' name='email' placeholder='email' />
                        </div>
                        <div>
                            <input type="text" required
                                onChange={(e) => handleChange(e)} value={input.password}
                                className='w-4/5 p-2 rounded-sm m-3' name='password' placeholder='password' />
                        </div>
                        <div>
                            <button type="submit" class="btn m-4 bg-slate-950 text-lg p-3 text-white">submit</button>
                        </div>
                    </form>
                    <div className='text-gray-800  text-lg m-4'>
                        Not a user ? <button
                            className='text-gray-500 ml-2 underline'
                        ><Link to={'/signup'} >Sign up</Link></button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Login