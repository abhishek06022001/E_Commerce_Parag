import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function Orders() {
    const { id } = useParams();
    const ac_token = localStorage.getItem('accessToken');
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    function move_back(e) {
        e.preventDefault();
        navigate('/');
    }
    useEffect(() => {
        async function getOrders() {
            try {
                const orders = await axios.get(`/api/get_orders/${id}`, {
                    headers: {
                        token: ac_token
                    }
                });
                // console.log("the orders are", orders.data.msg);

                let res = orders.data.msg;
                // console.log(res);
                let order_history = {};
                res.forEach(element => {
                    if (order_history[element['order_id']]) {
                        order_history[element['order_id']].push(element);
                    } else {
                        order_history[element['order_id']] = [];
                        order_history[element['order_id']].push(element);
                    }
                });
                setTimeout(() => {
                    setLoading(false);
                    setOrders(order_history);
                    console.log("The order history is ", order_history);
                }, 1000);
            } catch (error) {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/');
                    console.log("The order history is ", order_history);
                }, 1000);
            }
        }
        getOrders();
    }, [id]);
    function displayOrders(obj) {
        let ans = [];
        let total = 0;
        for (let key in obj) {
            let date = null;
            ans.push(<div className='bg-slate-700 rounded-lg h-auto mt-4 p-3 text-white' >
                <div>Order Date : {obj[key][0]['createdAt'].substring(0, 10)}</div>
                <div className='grid grid-cols-3 gap-1'>
                    <div className='bg-slate-600 p-3 rounded-sm'>Name</div>
                    <div className='bg-slate-600 p-3 rounded-sm'>Price</div>
                    <div className='bg-slate-600 p-3 rounded-sm'>Quantity</div>
                </div>
                {obj[key].map((element) => {
                    total += element.quantity * element.product_price_at_order;
                    return <div className='grid grid-cols-3 gap-1 mt-1'>
                        <div className='bg-slate-600 p-1 pl-3 rounded-sm' >{element.product_name}</div>
                        <div className='bg-slate-600 p-1 pl-3 rounded-sm' >${element.product_price_at_order}</div>
                        <div className='bg-slate-600 p-1 pl-3 rounded-sm' >{element.quantity}</div>
                    </div>
                })}
                <div>Total : ${total}</div>
            </div>);
        }
        return <>{ans}</>;
    }
    return (
        <>
            <div className='min-h-screen flex flex-col justify-center items-center relative  p-3' >
                {loading ? <>
                    <div class="spinner-3"></div>
                </> :
                    <div className='bg-white  h-auto w-3/4 p-4 m-4   '>
                        <button type='button' className='bg-slate-950 text-white p-4  '
                            onClick={(e) => move_back(e)}
                        >Back</button>
                        <h1 className='font-bold text-2xl mt-2' >ORDER HISTORY</h1>
                        {displayOrders(orders)}
                    </div>
                }
            </div >
        </>
    )
}
export default Orders