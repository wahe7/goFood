import React from 'react'

export default function Card(props) {

    let option=props.option;
    let priceOptions=Object.keys(option);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.imgsrc} className="card-img-top" alt="img is ..." style={{height:"200px", objectFit:"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodname}</h5>
                       
                        <div className='container' w-100>

                            <select className='m-2 h-100  bg-success rounded'>

                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )

                                })}
                            </select>

                            <select className='m-2 h-100  bg-success rounded'>
                                {priceOptions.map((data)=>{
                                     return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline fs-5 h-100 '>total price</div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
