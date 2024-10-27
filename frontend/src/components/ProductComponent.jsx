import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { addToCart, removeFromCart, placeOrder } from "../features/cart/cartSlice";
import { store } from '../store/store';
function ProductComponent() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();


  const navigate = useNavigate();
  const { role } = useSelector(state => state.users_store_reducer);
  const { cart } = useSelector(state => state.cart_reducer);

  const ac_token = localStorage.getItem('accessToken');
  function add(product) {
    setQuantity(prev => prev + 1);
    store.dispatch(addToCart(product));
  }
  function remove(product) {
    setQuantity(prev => prev - 1);

    store.dispatch(removeFromCart(product));
  }

  useEffect(() => {
    async function getProduct() {
      try {
        const fetched_product = await axios.get(`/api/get_product/${id}`, {
          headers: {
            token: ac_token
          }
        });
        let cart_id = fetched_product.data.msg.id;
        const prod = cart.find(element => element.id == cart_id);
        if (prod) {
          setQuantity(prod.quantity);
        }
        setProduct(fetched_product.data.msg);
        setLoading(false);

      } catch (error) {
     
        navigate('/');
      }
    }
    getProduct();
  }, [])
  return (
    <div
      className='h-screen 
      flex flex-col justify-center items-center
      '
    >
      <div
        className=' bg-white border border-solid rounded-md p-6 max_width_half'
      >
        {loading ?
          <div>Loading pending ... </div>
          :
          <div
          >
            <button
              className='bg-slate-600 p-3  text-white  rounded-full'
              onClick={() => navigate('/')}
            >
              <BiArrowBack size={40} />

            </button>
            <img
              className="h-52 mx-auto"
              src={"http://localhost:8080/" + product.image} alt="" />
            <div
              className='flex flex-col '
            >
              <h1
                className='font-semibold text-slate-700 text-2xl'
              >{product.name}</h1>
              <h1>
                {product.description}
              </h1>
              <h1>
                <span className="text-3xl font-bold">${product.price}</span>
              </h1>
              <h1>
                {product.category}
              </h1>
              <div className='flex' >

                {(role == 0) &&
                  <button
                    className='bg-slate-600 p-3 mt-3 mb-3 text-white'
                    onClick={() => add(product)}

                  >Add to Cart

                  </button>
                }
                {
                  (quantity > 0) &&

                  <>
                    <button
                      className='font-mono text-sky-950 ml-3 mr-3 '
                    >{quantity}</button>

                    < button
                      className='bg-slate-600 p-3 mt-3 mb-3 sm:ml-0 ml-3 text-white'
                      onClick={() => remove(product)}

                    >Remove from Cart

                    </button>
                  </>

                }


              </div>

            </div>
          </div>
        }

      </div>

    </div >
  )
}

export default ProductComponent