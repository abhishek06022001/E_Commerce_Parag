import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function Orders() {
    const { id } = useParams();
    const ac_token = localStorage.getItem('accessToken');
    const [orders, setOrders] = useState({
        orders: [], loading: true
    });
    const navigate = useNavigate();
    function move_back(e) {
        e.preventDefault();
        navigate('/');
    }
    console.log("rendered again ?");

    useEffect(() => {
        async function getOrders() {
            try {
                const orders = await axios.get(`/api/get_orders/${id}`, {
                    headers: {
                        token: ac_token
                    }
                });
                setTimeout(() => {
                    setOrders({ loading: false, orders: orders.data.msg });
                }, 100);
            } catch (error) {
                setTimeout(() => {
                    setOrders({ loading: true, orders: null });
                    console.log("The order history is ", order_history);
                }, 100);
            }
        }
        getOrders();
    }, [id]);
    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center relative  p-3' >
                {orders.loading ? <>
                    <div class="spinner-3"></div>
                </> :
                    <div className='bg-white h-auto w-3/4 p-4 m-4'>
                        <button type='button' className='bg-slate-950 text-white p-4' onClick={(e) => move_back(e)}>Back</button>
                        <h1 className='font-bold text-2xl mt-2'>ORDER HISTORY</h1>
                        {console.log(orders.orders)}
                        <h1>{orders.orders[0][0].id}</h1>
                        {orders.orders.map((order_array, index) => {

                            if (!order_array) {
                                return null;
                            }
                            let order_total = 0;
                            return <div className='bg-purple-400 p-1 my-1'>
                                {order_array?.map(order => {
                                    order_total += order.product_price_at_order * order.quantity;
                                    return <div className='bg-red-600 flex gap-3  p-1 ' >
                                        {order.product_name}
                                        {order.product_price_at_order}
                                        quantity is {order.quantity}
                                    </div>
                                })}
                                <div className='bg-slate-300 p-4 text-black' >Total {order_total} </div>
                            </div>
                        }
                            // <div className='bg-red-600 my-1 p-1' >hey</div>
                        )}
                    </div>
                }
            </div >
        </>
    )
}
export default Orders