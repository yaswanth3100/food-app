import React,{useEffect} from 'react'
import "./search.css"
// import data from './data'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
function Search({products,setProducts}) {
  const [food,setFood]=React.useState([]);
    const getdata= async ()=>{
    const {data}= await axios.get("http://localhost:5000/data");
    setFood(data);
}
  useEffect(() => {
 getdata();
}, [])
 const handleSubmitAll=(category)=>{
  if(category==='All')
  {
   setProducts(food);
   return;
  }
 const newProducts= food.filter((product)=>{return product.category===category})
 setProducts(newProducts)
 }
  return (
    <div className="search" >
      <div className="all"><Link to="/"><button className="btn-search" onClick={()=>handleSubmitAll('All')}>All</button></Link></div>
      <div className="breakfast"><Link to="/"><button className="btn-search" onClick={()=>handleSubmitAll('breakfast')} >Breakfast</button></Link></div>
      <div className="lunch"><Link to="/"><button className="btn-search" onClick={()=>handleSubmitAll('Lunch')}>Lunch</button></Link></div>
      <div className="dinner"><Link to="/"><button className="btn-search" onClick={()=>handleSubmitAll('Dinner')} 
      >Dinner</button></Link></div>

    </div>
  )
}

export default Search