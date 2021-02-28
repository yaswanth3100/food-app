import React,{useEffect} from 'react'
import data from './data';
import axios from 'axios';
import "./view.css"

function View({match}) {
  const[food,setFood]=React.useState([]);
  console.log(match.params.id);
     const getdata= async ()=>{
    const {data}= await axios.get("http://localhost:5000/data");
    setFood(data);
}
  useEffect(() => {
 getdata();
}, [])
 
  const product=food.find((x)=>x.id === match.params.id);
    const handleClick=(e)=>{
   e.preventDefault();
   axios.post("http://localhost:5000/insert",{name:product.name,price:product.price})
 }
  if(!product)
  {
    
   return <div>Page Not Found ;-;</div>
  }
  return (
    <div className="intro">

     <div className="img-col">
      <img className="view-img" src={product.image} alt=""/>
     </div>

      <div className="view-content">
        <center className="center">
         <div className="price">
        <h1>{product.name}</h1>
      <h3>${product.price}</h3>
        </div>
        </center>
       

       <div className="para">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aut soluta omnis maiores ipsa perferendis, fugiat optio temporibus nemo, blanditiis similique et earum dignissimos esse numquam ipsum recusandae dolor sunt.</p>
       </div>

      <div className="view-btn">
        <button className="myButton" onClick={handleClick}>Add to cart</button>
      </div>
      
      </div>
     
    </div>
  )
}

export default View