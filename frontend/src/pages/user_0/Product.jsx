
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
function Product() {
  
    return (
        
           
                <div className='min-h-screen flex flex-col ' >


                    <div className='bg-slate-900 h-14 text-white flex items-center justify-evenly '>

                        <div className='text-xl font-mono font-semibold' >PRODUCTS</div>
                        <div className='flex items-center gap-5'>
                            <input type="text" placeholder='search by name' className='p-1 pl-2 w-96 rounded-sm' />
                            <div className='text-black' >
                                <select name="category" id="category" className='rounded-sm text-sm p-1' >
                                    <option value="none">Select a category</option>
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                </select>
                            </div>
                            <div className='relative' >
                                <FaShoppingCart className='w-8' />
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 grid md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-3 gap-4 p-4' >
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>
                        <div
                            className='border border-solid'
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aperiam cumque commodi distinctio in necessitatibus porro explicabo ducimus, magnam illum quidem quia dolorem placeat harum eligendi, blanditiis autem voluptatem molestias.</div>


                    </div>


                </div>
            


    )
}

export default Product