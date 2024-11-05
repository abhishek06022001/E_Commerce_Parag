import { useContext, useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { DarkModeContext } from '../Context/DarkModeContext'
function Product() {
    const [products, setProducts] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(false);
    const [loading, setLoading] = useState(true); const inputRef = useRef();
    const [category, setCategory] = useState(null);
    const { role } = useSelector(state => state.users_store_reducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [delete_id, setDelete_id] = useState(null);
    const [delete_modal, set_is_delete_modal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [product, setProduct] = useState({
        file: ''
    });
    const fileInput = useRef();
    function changeProduct(e) {
        let property = e.target.name;
        if (property === 'file') {
            setProduct({ ...product, file: e.target.files[0] });
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value });
        }
    }
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
    function openModal(e) {
        if (e.target.name == 'create_product') {
            setIsEdit(false);
            setProduct({
                name: '', description: '', image: '', file: '', price: '', category: "none"
            });
        } else {
            const curr_product = filteredProducts.filter(prod => {
                if (prod.id == e.target.id) {
                    return (prod.id == e.target.id) ? prod : false;
                }
            });
            setProduct(curr_product[0]);
            setIsEdit(true);
        }
        setIsModalOpen(true);
    }
    let ac_token = localStorage.getItem('accessToken');
    async function submit_edited_product(e) {

        e.preventDefault();
        setProduct({
            name: '', description: '', image: '', file: '', price: '', category: "none"
        });
        const formData = new FormData();
        for (let key in product) {
            formData.append(key, product[key]);
        }
        try {
            const response = await axios.put(`/api/update_product/${product.id}`, formData,
                {
                    headers: {
                        token: ac_token
                    }
                }
            )
            // response.data.product
            const updated_product_array = filteredProducts.map(prod => {
                if (prod.id === response.data.product.id) {
                    return response.data.product;
                }
                return prod;
            });
            const updated_product_array_main = products.map(prod => {
                if (prod.id === response.data.product.id) {
                    return response.data.product;
                }
                return prod;
            })
            setFilteredProducts(updated_product_array);
            setProducts(updated_product_array_main);
            setIsModalOpen(false);
        } catch (error) {
            alert("some error while Editing product , please try again ...")
        }
    }
    async function create_new_product(e) {
        e.preventDefault();
        setProduct({
            name: '', description: '', image: '', file: '', price: '', category: "none"
        });
        const formData = new FormData();
        for (let key in product) {
            formData.append(key, product[key]);
        }
        try {
            const response = await axios.post('/api/create_product', formData,
                {
                    headers: {
                        token: ac_token
                    }
                }
            )
            fileInput.current.value = '';
            setProducts([...products, response.data.product]);
            setFilteredProducts([...filteredProducts, response.data.product]);
            setIsModalOpen(false);

            setProduct({ file: '' });
        } catch (error) {
            alert("some error while creating product , please try again ...")
        }
    }
    function closeModal() {
        setIsModalOpen(false);
        setProduct({
            name: '', description: '', image: '', file: '', price: '', category: "none"
        });

    }
    async function delete_product(e) {
        try {
            const del = await axios.delete(`/api/delete_product/${delete_id}`, {
                headers: {
                    token: ac_token
                }
            });
            const new_arr = filteredProducts.filter(prod => {
                if (prod.id == delete_id) {
                    return false;
                }
                else {
                    return prod;
                }
            });
            const new_arr1 = products.filter(prod => {
                if (prod.id == delete_id) {
                    return false;
                }
                else {
                    return prod;
                }

            });

            setProducts(new_arr1);
            setFilteredProducts(new_arr);
            set_is_delete_modal(false);

        } catch (error) {
            console.log(error.message);
        }
    }
    function open_delete_modal(e) {
        setDelete_id(e.target.id);
        set_is_delete_modal(true);
    }
    return (
        <>
            {
                loading ?
                    <div className='min-h-screen flex flex-col ' >
                        <div className='bg-slate-900 h-14 text-white flex items-center justify-evenly '>
                            {/* <div>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer" onChange={toggleDarkMode} />
                                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span class={`${darkMode ? `text-white` : `text-gray-900`}ms-3 text-sm font-medium  pl-1`}

                                    >Change Theme</span>
                                </label>
                            </div> */}
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
                                {(role == 1) ? <>
                                    <button className="text-white">Create Product</button>
                                </> : <>
                                    <div className='relative' >
                                        <FaShoppingCart className='w-8' />
                                    </div>

                                </>}

                            </div>
                        </div>
                        <div className=' flex flex-1 justify-center items-center'>
                            <div className="spinner-3" ></div >
                        </div>
                    </div> :
                    <>
                        <div className='min-h-screen flex flex-col relative ' >
                            {/* modal hai  */}
                            <div className={`h-4/5 rounded-lg overflow-auto w-auto fixed top-1/2 left-1/2 bg-slate-100 -translate-x-1/2 -translate-y-1/2 z-30 p-10
                                
                                ${isModalOpen ? "" : "hidden"}`}>
                                <div>
                                    {isEdit ?
                                        <>
                                            <div className="" >
                                                <h1
                                                    onClick={(e) => closeModal()}
                                                    className="bg-red-600 h-10 w-10 absolute top-0 right-0 flex justify-center items-center  ml-auto  text-white  text-xl  hover:cursor-pointer
                                            ">
                                                    x
                                                </h1>
                                                <h1
                                                    className="text-center font-bold text-2xl  mb-7"
                                                >EDIT PRODUCT</h1>
                                                <form onSubmit={(e) => submit_edited_product(e)}>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3 my-1">
                                                        <label htmlFor="file" className="font-semibold ">INPUT IMAGE</label>
                                                        <input type="file" name="file" onChange={e => changeProduct(e)}
                                                            ref={fileInput}
                                                        />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3  my-1">
                                                        <label htmlFor="name" className="font-semibold">Enter Name</label>
                                                        <input type="text" name="name"
                                                            value={product.name}
                                                            onChange={(e) => changeProduct(e)}
                                                            className=" p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3  my-1">
                                                        <label htmlFor="description" className="font-semibold">Enter Description</label>
                                                        <textarea type="text"
                                                            value={product.description}
                                                            rows={5} cols={50}
                                                            onChange={(e) => changeProduct(e)}
                                                            name="description" className="bg-slate-300 p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3  my-1">
                                                        <label htmlFor="name" className="font-semibold">Enter Price</label>
                                                        <input type="number" name="price"
                                                            value={product.price}
                                                            onChange={(e) => changeProduct(e)}
                                                            className="p-1" />
                                                    </div>
                                                    <div className='text-black  bg-slate-200 p-3  my-1' >
                                                        <select name="category" id="category" 
                                                            value={product.category}
                                                            onChange={(e) => changeProduct(e)}
                                                            className='py-2 rounded-lg font-semibold' >
                                                            <option value="none">Select a category</option>
                                                            <option value="electronics">electronics</option>
                                                            <option value="men's clothing">men's clothing</option>
                                                            <option value="jewelery">jewelery</option>
                                                        </select>
                                                    </div>
                                                    <button className="bg-black p-2 mt-2 text-white" >
                                                        Submit
                                                    </button>
                                                </form>

                                            </div>
                                        </>
                                        :
                                        <>

                                            <div className="" >
                                                <h1
                                                    onClick={(e) => closeModal()}
                                                    className="bg-red-600 h-10 w-10 absolute top-0 right-0 flex justify-center items-center  ml-auto  text-white  text-xl  hover:cursor-pointer
                                            ">
                                                    x
                                                </h1>
                                                <h1
                                                    className="text-center font-semibold text-lg mb-7"
                                                >Create A new Product</h1>
                                                <form onSubmit={(e) => create_new_product(e)}>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3 my-1">
                                                        <label htmlFor="file" className="font-semibold" >Input Image</label>
                                                        <input type="file" name="file" onChange={e => changeProduct(e)}
                                                            ref={fileInput}
                                                        />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3 my-1">
                                                        <label htmlFor="name" className="font-semibold">Enter Name</label>
                                                        <input type="text" name="name"
                                                            value={product.name}
                                                            onChange={(e) => changeProduct(e)}
                                                            className=" p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3 my-1">
                                                        <label htmlFor="description" className="font-semibold">Enter Description</label>
                                                        <textarea type="text"
                                                            value={product.description}
                                                            rows={5} cols={50}
                                                            onChange={(e) => changeProduct(e)}
                                                            name="description" className=" p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4 bg-slate-200 p-3 my-1">
                                                        <label htmlFor="name" className="font-semibold">Enter Price</label>
                                                        <input type="number" name="price"
                                                            value={product.price}
                                                            onChange={(e) => changeProduct(e)}
                                                            className=" p-1" />
                                                    </div>
                                                    <div className='text-black ' >
                                                        <select name="category" id="category"
                                                            value={product.category}
                                                            onChange={(e) => changeProduct(e)}
                                                            className=' bg-slate-200 p-3 my-1 ' >
                                                            <option value="none">Select a category</option>
                                                            <option value="electronics">electronics</option>
                                                            <option value="men's clothing">men's clothing</option>
                                                            <option value="jewelery">jewelery</option>
                                                        </select>
                                                    </div>
                                                    <button className="bg-black p-2 mt-2 text-white" >
                                                        Submit
                                                    </button>
                                                </form>

                                            </div>
                                        </>
                                    }
                                </div>

                            </div>

                            <div className={`h-screen fixed w-screen top-0 left-0 bg-gray-900 bg-opacity-70 z-10  ${(delete_modal || isModalOpen) ? "" : "hidden"}`}> </div>
                            <div className={`h-auto w-auto fixed top-1/2 left-1/2 bg-white  -translate-x-1/2 -translate-y-1/2 z-30 p-10 ${delete_modal ? "" : "hidden"}`}>
                                Do you really want to delete the product ?
                                <div className="flex gap-5" >
                                    <button className="p-1 font-semibold border border-solid-black "
                                        onClick={e => delete_product(e)}
                                    >Yes</button>
                                    <button className="p-1 font-semibold border border-solid-black "
                                        onClick={e => set_is_delete_modal(false)}
                                    >Nope</button>
                                </div>
                            </div>

                            {/* navbar  */}
                            <div className={` ${darkMode ? `bg-slate-900 text-white` : `bg-white text-black `} navbar h-14  flex items-center justify-evenly`}>
                                <div className='text-xl font-mono font-semibold' >PRODUCTS</div>
                                <div className='flex items-center gap-5'>
                                    <input type="text" placeholder='search by name'
                                        className='p-1 pl-2 w-96 rounded-sm '
                                        onChange={(e) => handleChange(e)}
                                        ref={inputRef}
                                    />
                                    <div>
                                        {/* <label class="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" class="sr-only peer" onChange={toggleDarkMode} />
                                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span class={`${darkMode ? `text-white` : `text-gray-900`}ms-3 text-sm font-medium  pl-1`}

                                            >Change Theme</span>
                                        </label> */}
                                    </div>
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
                                    {(role == 1) ? <>
                                        <button className="text-white" name="create_product" onClick={(e) => openModal(e)} >Create Product</button>

                                    </> : <>
                                        <div className='relative' >
                                            <Link to={`cart`} >
                                                <FaShoppingCart className='w-8' />
                                            </Link>

                                        </div>

                                    </>}
                                </div>
                            </div>
                            {/* filtered products ka lists  */}
                            <div className={`${darkMode ? `bg-slate-800` : `bg-slate-400`} navbar flex-1 grid md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-4 gap-4 p-4 cards `} >
                                {filteredProducts.map((element) => {
                                    return (
                                        <div className={`${darkMode ? `individual_prod-dark-mode navbar` : `individual_prod-light-mode`}
                                            bg-white text-black  border border-solid  h-max   flex 
                                        justify-center 
                                        rounded-lg`}
                                            key={element.id}
                                        >
                                            <div className="  flex flex-col justify-center items-center p-3">
                                                <img
                                                    className={`md:h-44`}
                                                    src={"http://localhost:8080/" + element.image} alt="" />
                                                <div
                                                    className="font-medium text-slate-800 "
                                                >{element.name}</div>
                                                <div className="text-3xl font-bold">${element.price}</div>
                                                <div className="flex  gap-1 items-center">
                                                    {(role == 1)
                                                        ?
                                                        <>
                                                            <Link to={`product/${element.id}`} >
                                                                <button className="text-white p-1 text-sm bg-slate-700 font-semibold border
                                                                border-solid-black ">View Product</button>
                                                            </Link>
                                                            <button className="text-sm text-white p-1 bg-slate-700 font-semibold border border-solid-black"
                                                                name="edit_product" onClick={(e) => openModal(e)} id={element.id}
                                                            >Edit Product</button>

                                                            <button className=" text-sm text-white p-1 bg-slate-700 font-semibold border border-solid-black"
                                                                onClick={(e) => open_delete_modal(e)} id={element.id}
                                                            >Delete Product</button>

                                                        </>
                                                        : <>
                                                            <Link to={`product/${element.id}`} >
                                                                <button className="p-1 font-semibold border border-solid-black" >View Product</button>

                                                            </Link>
                                                        </>
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Product