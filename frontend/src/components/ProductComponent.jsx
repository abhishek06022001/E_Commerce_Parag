import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';
function ProductComponent() {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useSelector(state => state.users_store_reducer);
  const ac_token = localStorage.getItem('accessToken');
  useEffect(() => {
    async function getProduct() {
      try {
        const fetched_product = await axios.get(`/api/get_product/${id}`, {
          headers: {
            token: ac_token
          }
        });
        setProduct(fetched_product.data.msg);
        setLoading(false);
      } catch (error) {
        alert("Sorry , some issues ....")
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
              <div >

                {(role == 0) &&
                  <button
                    className='bg-slate-600 p-3 mt-3 mb-3 text-white'
                    onClick={() => alert("button clicked")}
                  >Add to Cart

                  </button>
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