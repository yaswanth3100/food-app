import axios from 'axios';
import React, { useState,useContext ,useEffect} from 'react'
import { DataContext } from './App';

function Cart() {
  const[item,setItem]=useState([]);
   const[loading,setLoading]=useState(false);
  const[error,setError]=useState(false);
  const[total,setTotal]=useState(0);
  const handleDelete=(id)=>{
    axios.delete(`http://localhost:5000/delete/${id}`)
    window.location.reload();
  }
  const getcartItems=async()=>{
    try{
      setLoading(true);
      const {data}=await axios.get('http://localhost:5000/read')
      setLoading(false);
      setItem(data);
    }
    catch
    {
      setError(true);
    setLoading(false);
    }
    
  }
  const getTotalPrice=()=>{
   let sum=0;
   for(let i=0;i<item.length;i++)
   {
    sum+= parseInt(item[i].price);
   }
   console.log(sum);
   setTotal(sum);
  }
  useEffect(()=>{
    getTotalPrice();
  },[item])
  useEffect(()=>{
   getcartItems();
  },[])
  // const {carts,setCarts}=useContext(DataContext);
   if(error)
 {
   return <img src="https://media3.giphy.com/media/DYJJkeOnkk0Le0mf9a/200w.webp?cid=ecf05e47ant61bmrzhbkybu3oejxkuh3j52mmdy8hv6hbdc1&rid=200w.webp" alt=""/>
 }
 if(loading)
 {
   return <img src="https://media3.giphy.com/media/FbbRaTLzKXzA3K1q8U/200w.webp?cid=ecf05e47w6dyq98mklrxvog86jh5lr2d0t9x9m2d8hhkogfs&rid=200w.webp" alt="" width="150rem" height="150rem"/>
 }
 if(item.length==0)
 {

   return <div>
     <img src="https://media3.giphy.com/media/PFrfp4s3Pnf0xBhZJT/200.webp?cid=ecf05e474j62vjxx4b7frf6hwsp7r6z0xbi5kmvbtqcih3qi&rid=200.webp" alt="" width="150rem" height="150rem"/>
     <h3>  Cart is Empty</h3>
   </div> 
 }
  return (
    <div>
      {
        
        item.map((cart)=>{
          const {name,price,_id}=cart;
          return(
            <div className="cartItem">
              <div className="cartItem__name">
              <h1>{name}</h1>
              </div>
              <div>
              <p>${price}</p>
             
              </div>

              <div className="remove-btn">
               <button className="btn" onClick={()=>handleDelete(_id)}>remove</button>
              </div>
              
            </div>
            
          )
        })
      }
      <center>
       <p>total price:{total}</p>
      </center>
      
    </div>
  )
}

export default Cart