import React ,{useEffect}from 'react';
import './App.css'
import Products from './products';
// import data from './data';
import Search from './Search';
import Cart from "./cart";
import axios from 'axios';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import View from './view';
import Aboutus from './Aboutus'
export const DataContext=React.createContext();


const AllProducts=({products,setProducts})=>{
 return( <div className="again">
  
  {
      products.map((product,index)=>{
       return <Products id={index} {...product}/>
     })
  }
  
  </div>)

}

function App() {
  const [products,setProducts]= React.useState([]);
  const[carts,setCarts]=React.useState([]);
  const getdata= async ()=>{
    const {data}= await axios.get("http://localhost:5000/data");
    setProducts(data);
}
  useEffect(() => {
 getdata();
 
}, [])
  return (
    <DataContext.Provider value={{carts,setCarts}}>
    <Router>
         <div className="screen">
  <nav className="row">
   <div className="screen__logo"><a href="">Lunch Box</a></div>
   <div>
    <a className="added" href="/cart">Cart</a>
    <a href="/about">About Us</a>
   </div>
  </nav>
  
  <main>
   
     
  <Search products={products} setProducts={setProducts}/>
    <Route  path="/" render={() => <AllProducts products={products}/>} exact></Route>
   <Route  path="/view/:id" component={View} exact></Route>
   <Route  path="/cart" render={() => <Cart/>  } exact></Route> 
   <Route  path="/about" render={() => <Aboutus/>  } exact></Route> 
  </main>
  <footer className="row center">
   <h4>© All Rights Reserved</h4>
  </footer>
 </div>

 </Router>
  </DataContext.Provider>
  );
}

export default App;
