import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../store/store';
import { addToCart, removeFromCart, placeOrder } from "../features/cart/cartSlice";
import axios from 'axios';
function Cart() {
    // get cart details from the redux tookit 
    // loading part will be here 
    // after place order it will redirect to the / page 
    // price calculation will be done here 
    // get user address from
    // get address in useEffect 
    const ac_token = localStorage.getItem('accessToken');
    const { id } = useSelector(state => state.users_store_reducer);
    const { cart } = useSelector(state => state.cart_reducer);

    const navigate = useNavigate('');

    let total = cart.reduce((acc, curr) => {
        acc += curr.quantity * curr.price;
        return acc;
    }, 0);
    async function place_order_function(e) {
        e.preventDefault();
        try {
            // console.log("the cart is", cart);
            const res = await axios.post(`api/submit_order/${id}`, [...cart], {
                headers: {
                    token: ac_token
                }
            });
        } catch (error) {
            console.log("some error", error);
        }
        store.dispatch(placeOrder());
        navigate('/');
    }
    const [address, setAddress] = useState(null);
    useEffect(() => {
        async function getAddress() {
            const user_info = await axios.get(`/api/get_user/${id}`, {
                headers: {
                    token: ac_token
                }
            });
            setAddress(user_info.data[0].address);
        }
        getAddress();
    }, [])

    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center relative ' >
                <div className='bg-white  h-auto min-w-96 p-10   text-center'>
                    <div className='bg-slate-300 w-full grid mb-1 p-4 grid-cols-3 gap-3 font-semibold text-lg'>
                        <div>Product</div>
                        <div>Price</div>
                        <div>Quantity</div>
                    </div>
                    {cart.map(order => {
                        return <div className='bg-slate-300 w-full 
                        grid  grid-cols-3 gap-3
                        h-auto mb-1 p-4' >
                            <div className='border border-solid  '>{order.name}</div>
                            <div className='border border-solid  '>${order.price}</div>
                            <div className='border border-solid '>
                                <button className='bg-slate-800 p-2 mr-3 text-white'
                                    onClick={(e) => store.dispatch(addToCart(order))}
                                >+</button>
                                {order.quantity}
                                <button className='bg-slate-800 p-2 ml-3 text-white'
                                    onClick={(e) => store.dispatch(removeFromCart(order))}
                                >-</button>
                            </div>
                        </div>
                    })}
                    <div className='bg-slate-300 w-full grid mb-1 p-4 grid-cols-3 gap-3'>
                        <div></div>
                        <div>Total</div>
                        <div>${total}</div>
                    </div>
                    <div className='bg-slate-300 w-full  mb-1 p-4  gap-3'>

                        <div>{<>Deliver to : {address}</>}</div>
                    </div>
                    <div className='flex gap-5 '>
                        <button className='bg-slate-900 text-white w-full  p-3'
                            onClick={(e) => place_order_function(e)}
                        >
                            Place Order
                        </button>
                        <Link to={'/'} >
                            <button className='bg-slate-900 text-white w-full  p-3'>
                                Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Cart