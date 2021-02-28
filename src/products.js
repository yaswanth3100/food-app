import React,{useContext} from 'react'
import './products.css'
import {Link} from 'react-router-dom';
import {DataContext} from "./App"
import Axios from 'axios';

function Products({id,name,price,image}) {
  const [item,setItem]=React.useState({});
 const {carts,setCarts}=useContext(DataContext);
 const handleClick=(e)=>{
   e.preventDefault();
   Axios.post("http://localhost:5000/insert",{name:name,price:price})
   
   
 }
  return (
    <div className="each-product">
     <Link to={`/view/${id}`}>
     <img className="img" src={image} alt="" width='280px' height="250px"/>
     </Link>
      
      <div className="details">
       <div >
      <h2>{name}</h2>
      <h4>$ {price}</h4>
      </div>
      <div>
      <button className="myButton" onClick={handleClick} ><h4>Add</h4></button>
     
      </div>
      {/* <div>
        <input type="checkbox" name="" id=""/>
      </div> */}
      </div>
      
      
    </div>
  )
}

export default Products