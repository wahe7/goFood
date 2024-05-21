import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './Contextreducer'

export default function Card(props) {
let dispatch=useDispatchCart();
let data=useCart();
const priceref=useRef();
    let option=props.option;
    let priceOptions=Object.keys(option);
    const [qty,setqty]= useState(1)
     const [size , setsize]=useState("")
    const handleaddcart=async ()=>{
        await dispatch({type:"ADD",id:props.foodItem._id,name: props.foodItem.name,price:finalprice,qty:qty,size:size,img:props.foodItem.img});
        await console.log(data);
    }

    let finalprice=qty * parseInt(option[size]);

useEffect(()=>{
    setsize(priceref.current.value);
},[])


    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"120px", objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                       
                        <div className='container' w-100>

                            <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setqty(e.target.value)}>

                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )

                                })}
                            </select>

                            <select className='m-2 h-100  bg-success rounded' ref={priceref} onChange={(e)=>setsize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                     return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5 '>₹{finalprice}/- </div>

                          
                        </div>


                     
    
                    </div>

                    <hr>
                    </hr>
                    <button className={`btn btn-success justify-center ms-7`} onClick={handleaddcart}>Add to Cart</button>
                   
                </div>
            </div>
        </div>
    )
}
