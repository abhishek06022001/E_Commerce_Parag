import React from 'react'

function Login() {
    return (
        <div className='text-center flex  flex-col justify-center items-center h-screen bg-slate-600 '>
            <div
                className=' bg-slate-400  rounded-md md:w-96 w-80
                pt-8 pb-8
                '
            >
                <div className='font-bold text-stone-100 text-4xl m-3' >
                    Login Page
                </div>
                <div>
                    <input type="text" className='w-4/5 p-2 rounded-sm m-3' name='email' placeholder='email' />
                </div>
                <div>
                    <input type="text" className='w-4/5 p-2 rounded-sm m-3' name='password' placeholder='password' />
                </div>
                <div>
                    <button type="submit" class="btn m-4 bg-slate-950 text-lg p-3 text-white">submit</button>
                </div>
                <div
                    className='text-purple-100  text-lg'
                >
                    Not a user ? <button
                        className='text-purple-700 m-4'
                    >Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Login