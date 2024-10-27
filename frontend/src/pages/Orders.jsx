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
            const orders = await axios.get(`/api/get_orders/${id}`, {
                headers: {
                    token: ac_token
                }
            })
            let res = orders.data.msg;
         
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
            }, 2000);
        }
        getOrders();
    }, [id]);
    function displayOrders(obj) {
        let ans = [];
        for (let key in obj) {
            let total = 0;
            let date = null;
            ans.push(<div className='bg-slate-500 h-auto m-1 p-3 text-white' >
                <div> Order details :</div>
                <div>Order Date : {obj[key][0]['createdAt'].substring(0, 10)}</div>
                {obj[key].map((element) => {

                    total = element.quantity * element.price;
                    return <div className='flex justify-between'>

                        <div>{element.name}</div>
                        <div className='flex gap-2' >
                            <div>{element.price}</div>
                            <div>{element.quantity}</div>
                        </div>

                    </div>
                })}
                <div>Total : ${total}</div>
            </div>);
        }
        return <>{ans}</>;
    }
    return (
        <>

            <div className='min-h-screen flex flex-col justify-center items-center relative ' >

                {loading ? <>
                    <div class="spinner-3"></div>
                </> :
                    <div className='bg-white  h-auto min-w-96 p-4   '>
                        <button type='button' className='bg-slate-950 text-white p-4  '
                            onClick={(e) => move_back(e)}
                        >Back</button>
                        {displayOrders(orders)}
                    </div>
                }

            </div >
        </>
    )
}

export default Orders