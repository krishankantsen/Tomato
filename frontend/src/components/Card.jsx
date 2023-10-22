import React, { useState,useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';


export default function Card(props) {
  let dispatch = useDispatchCart();
  let data =useCart()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')
  let options = props.options;
  let priceOptions = Object.keys(options)

  const handleAddToCart = async () => {
    // Ensure that props.foodItem is defined and has the expected structure
    if (props.foodItem && props.foodItem._id) {
     
      const existingCartItem = data.find((item) => item.id === props.foodItem._id);
  
      if (existingCartItem) {
        if (existingCartItem.size === size) {
          await dispatch({
            type: "UPDATE",
            id: props.foodItem._id,
            price: finalPrice,
            qty: qty,
          });
          return;
        } else {
          await dispatch({ 
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.ImgSrc,
          });
          console.log("Size different so simply ADD one more to the list");
          return;
        }
      }
      
  
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
      console.log(data);
    } else {
      // Handle the case where props.foodItem or props.foodItem._id is undefined
      console.error("props.foodItem or props.foodItem._id is undefined");
    }
  };
  

  const priceRef=useRef()
  let finalPrice =qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
      <div><div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
        <img src={props.foodItem.img} className="card-img-top object-fit-cover" style={{ 'height': "150px", objectFit: "fill" }} alt="..." />
        <div className="card-body">
          <h5 className="card-title fs-bold">{props.foodItem.name}</h5>
          <p className="card-text"> </p>
          <div className="container w-100">
            <select className='m-2 h-100  text-white rounded bg-danger' onChange={(e) => setQty(e.target.value)} >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option className='btn' key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100 text-white rounded bg-danger ' onChange={(e) => setSize(e.target.value)} ref={priceRef} >
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-6 m-3">Rs.{finalPrice}/-</div>
            <hr />
            <button className='btn btn-danger justify-center ms-2 ' onClick={handleAddToCart}>Add to Cart</button>
          </div>

        </div>

      </div></div>
    </div>
  )
}
