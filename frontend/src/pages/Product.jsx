import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
function Product() {
    const [products, setProducts] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(false);
    const [loading, setLoading] = useState(true); const inputRef = useRef();
    const [category, setCategory] = useState(null);
    const { role } = useSelector(state => state.users_store_reducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
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
    function openModal(e) {
        if (e.target.name == 'create_product') {
            setIsEdit(false);
            setProduct({
                name:'',description:'',image:'',file:'',price:'',category:"none"
            });
        } else {
            const curr_product = filteredProducts.filter(prod => {
                if (prod.id == e.target.id) {
                    return prod;
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
            alert("product Updated successFully");
            
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
            alert("product Created successFully");
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
                                {(role == 1) ? <>
                                    <button className="text-white">Create Product</button>
                                </> : <>
                                    <div className='relative' >
                                        <FaShoppingCart className='w-8' />
                                    </div>
                                    <div>{role}</div>
                                </>}

                            </div>
                        </div>
                        <div className=' flex flex-1 justify-center items-center'>
                            <div className="spinner-3" ></div >
                        </div>
                    </div> :
                    <>
                        <div className='min-h-screen flex flex-col relative ' >
                            <div className={`h-auto w-auto absolute top-1/2 left-1/2 bg-white  -translate-x-1/2 -translate-y-1/2 z-100000 p-10 ${isModalOpen ? "" : "hidden"}`}>
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
                                                    className="text-center font-semibold text-lg mb-7"
                                                >Edit Product</h1>
                                                <form onSubmit={(e) => submit_edited_product(e)}>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="file">Input Image</label>
                                                        <input type="file" name="file" onChange={e => changeProduct(e)}
                                                            ref={fileInput}
                                                        />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="name">Enter Name</label>
                                                        <input type="text" name="name"
                                                            value={product.name}
                                                            onChange={(e) => changeProduct(e)}
                                                            className="bg-blue-400 p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="description">Enter Description</label>
                                                        <textarea type="text"
                                                            value={product.description}
                                                            rows={5} cols={50}
                                                            onChange={(e) => changeProduct(e)}
                                                            name="description" className="bg-blue-400 p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="name">Enter Price</label>
                                                        <input type="number" name="price"
                                                            value={product.price}
                                                            onChange={(e) => changeProduct(e)}
                                                            className="bg-blue-400 p-1" />
                                                    </div>
                                                    <div className='text-black ' >
                                                        <select name="category" id="category"
                                                            value={product.category}
                                                            onChange={(e) => changeProduct(e)}
                                                            className='  ' >
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
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="file">Input Image</label>
                                                        <input type="file" name="file" onChange={e => changeProduct(e)}
                                                            ref={fileInput}
                                                        />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="name">Enter Name</label>
                                                        <input type="text" name="name"
                                                            value={product.name}
                                                            onChange={(e) => changeProduct(e)}
                                                            className="bg-blue-400 p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="description">Enter Description</label>
                                                        <textarea type="text"
                                                            value={product.description}
                                                            rows={5} cols={50}
                                                            onChange={(e) => changeProduct(e)}
                                                            name="description" className="bg-blue-400 p-1" />
                                                    </div>
                                                    <div className="mb-5 flex justify-between gap-4">
                                                        <label htmlFor="name">Enter Price</label>
                                                        <input type="number" name="price"
                                                            value={product.price}
                                                            onChange={(e) => changeProduct(e)}
                                                            className="bg-blue-400 p-1" />
                                                    </div>
                                                    <div className='text-black ' >
                                                        <select name="category" id="category"
                                                            value={product.category}
                                                            onChange={(e) => changeProduct(e)}
                                                            className='  ' >
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
                            {/* modal below */}


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
                                    {(role == 1) ? <>
                                        <button className="text-white" name="create_product" onClick={(e) => openModal(e)} >Create Product</button>

                                    </> : <>
                                        <div className='relative' >
                                            <FaShoppingCart className='w-8' />
                                        </div>
                                        <div>{role}</div>
                                    </>}
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

                                                    {(role == 1)
                                                        ?
                                                        <>
                                                            <Link to={`product/${element.id}`} >
                                                                <button className="p-1 font-semibold border border-solid-black" >View Product</button>
                                                            </Link>

                                                            <button className="p-1 font-semibold border border-solid-black"
                                                                name="edit_product" onClick={(e) => openModal(e)} id={element.id}
                                                            >Edit Product</button>

                                                            <button className="p-1 font-semibold border border-solid-black" >Delete Product</button>

                                                        </>
                                                        : <>
                                                            <Link to={`product/${element.id}`} >
                                                                <button className="p-1 font-semibold border border-solid-black" >View Product</button>
                                                            </Link>
                                                        </>
                                                    }

                                                </div>
                                                {/* <h1>{element.category}</h1> */}
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