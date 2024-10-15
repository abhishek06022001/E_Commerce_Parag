import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    return (

        <div className='text-center flex  flex-col justify-center items-center h-screen bg-slate-800 '>
            <div
                className=' bg-slate-300  rounded-md md:w-96 w-80
                pt-8 pb-8
                '
            >
                <div className='font-bold text-black text-4xl m-3' >
                    Signup Page
                </div>
                <form onSubmit={e => login(e)}>
                    <div>
                        <input type="text"
                            required
                            onChange={(e) => handleChange(e)}
                            // value={input.email}

                            className='w-4/5 p-2 rounded-sm m-3' name='email' placeholder='email' />
                    </div>
                    <div>
                        <input type="text" required
                            onChange={(e) => handleChange(e)}
                            // value={input.password}
                            className='w-4/5 p-2 rounded-sm m-3' name='password' placeholder='password' />
                    </div>
                    <div>
                        <input type="text" required
                            onChange={(e) => handleChange(e)}
                            // value={input.password}
                            className='w-4/5 p-2 rounded-sm m-3' name='name' placeholder='name' />
                    </div>
                    <div>
                        <button type="submit" class="btn m-4 bg-slate-950  text-lg p-3 text-white">submit</button>
                    </div>
                </form>
                <div
                    className='text-gray-800 m-4 text-lg'
                >
                    Already a user ? <button
                        className='text-gray-500 ml-2 underline'
                    ><Link to={'/login'} >Log in</Link></button>
                </div>

            </div>
        </div>

    )
}

export default Signup