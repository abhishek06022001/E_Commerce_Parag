import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
function Product() {
    const [products, setProducts] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(false);
    const [loading, setLoading] = useState(true); const inputRef = useRef();
    const [category, setCategory] = useState(null);
    async function fetchProducts() {
        let ans_arr = await axios.get('/api/get_products');
        fetched_products = ans_arr.data.msg;
        setProducts(fetched_products);
        setFilteredProducts(fetched_products);
    }
    // Reducer logic here 
    function handleCategoryChange(e) {
        if (e.target.value == "none") {
            inputRef.current.value = '';
            setCategory(null);
            setFilteredProducts(products);
        } else {
            let new_arr = products.filter((product) => {
                return (product.category == e.target.value) ? product : false;
            });
            inputRef.current.value = '';
            setCategory(e.target.value);
            setFilteredProducts(new_arr);
        }

    }
    let fetched_products = '';
    useEffect(() => {
        fetchProducts();
        setTimeout(() => {
            setProducts(fetched_products);
            setLoading(false);
        }, 1200);
    }, []);
    async function handleChange(e) {
        let filter_name = e.target.value.toLowerCase();
        if (filter_name == '') {
            let new_arr = products.filter((product) => {
                if (category) {
                    return (product.category == (category)) ? product : false;
                }
                return product;

            });
            console.log("new arr is", new_arr);

            // inputRef.current.value = '';
            setFilteredProducts(new_arr);
        } else {
            let filter_array = filteredProducts.filter((product) => {
                if (((product.name.toLowerCase()).startsWith(filter_name))) {
                    return product;
                }
            });
            setFilteredProducts(filter_array);
        }

    }
    return (
        <>
            {
                loading ?
                    <div className='min-h-screen flex flex-col ' >
                        <div className='bg-slate-900 h-14 text-white flex items-center justify-evenly '>
                            <div className='text-xl font-mono font-semibold' >PRODUCTS</div>
                            <div className='flex items-center gap-5'>
                                <input type="text" placeholder='search by name'
                                    className='p-1 pl-2 w-96 rounded-sm' />
                                <div className='text-black' >
                                    <select name="category" id="category"
                                        className='rounded-sm text-sm p-1' >
                                        <option value="none">Select a category</option>
                                        <option value="electronics">electronics</option>
                                        <option value="men's clothing">men's clothing</option>
                                        <option value="jewelery">jewelery</option>
                                    </select>
                                </div>
                                <div className='relative' >
                                    <FaShoppingCart className='w-8' />
                                </div>
                            </div>
                        </div>
                        <div className=' flex flex-1 justify-center items-center'>
                            <div className="spinner-3" ></div >
                        </div>
                    </div> :
                    <div className='min-h-screen flex flex-col ' >
                        <div className='bg-slate-900 h-14 text-white flex items-center justify-evenly  '>
                            <div className='text-xl font-mono font-semibold' >PRODUCTS</div>
                            <div className='flex items-center gap-5'>
                                <input type="text" placeholder='search by name'
                                    className='p-1 pl-2 w-96 rounded-sm text-black'
                                    onChange={(e) => handleChange(e)}
                                    ref={inputRef}
                                />
                                <div className='text-black' >
                                    <select name="category" id="category"
                                        onChange={(e) => handleCategoryChange(e)}
                                        className='rounded-sm text-sm p-1' >
                                        <option value="none">Select a category</option>
                                        <option value="electronics">electronics</option>
                                        <option value="men's clothing">men's clothing</option>
                                        <option value="jewelery">jewelery</option>
                                    </select>
                                </div>
                                <div className='relative' >
                                    <FaShoppingCart className='w-8' />
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 grid md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-3 gap-4 p-4 ' >
                            {filteredProducts.map((element) => {
                                return (
                                    <div className='border border-solid bg-white h-max  p-2 flex rounded-lg'
                                        key={element.id}
                                    >
                                        <div>
                                            <img
                                                className="h-52 mx-auto"
                                                src={"http://localhost:8080/" + element.image} alt="" />
                                            <div
                                                className="font-medium text-slate-800 "
                                            >{element.name}</div>
                                            <div className="flex gap-1 items-center">
                                                <span className="text-3xl font-bold">${element.price}</span>
                                                <button className="p-1 font-semibold border border-solid-black" >View Product</button>
                                            </div>
                                            {/* <h1>{element.category}</h1> */}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
            }
        </>
    )
}

export default Product