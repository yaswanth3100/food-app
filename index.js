const express=require("express");
const mongoose=require("mongoose");
const data=require("./data")
const cors=require("cors");
const app=express();

require('dotenv').config();
app.use(express.json());
app.use(cors())
const CartModal=require("./cartsdata")
mongoose.connect(process.env.DB_CONNECTION,{
 useNewUrlParser:true,
 useUnifiedTopology: true 
})
app.get("/data",(req,res)=>{
 res.send(data)
})
app.post('/insert',async(req,res)=>{
 const itemname=req.body.name;
 const itemprice=req.body.price;
 const cart=new CartModal({name:itemname,price:itemprice})
 try{
  await cart.save();
  res.send("items added!!")
 }
 catch(err)
 {
  console.log(err);
 }
})
app.delete('/delete/:id',async(req,res)=>{
 const id=req.params.id;
 await CartModal.findByIdAndRemove(id).exec();
 res.send("deleted!!")
})
app.get("/read",async(req,res)=>{
 CartModal.find({},(err,result)=>{
  if(err)
  {
   res.send(err);
  }
  res.send(result);
 })
})
app.listen(process.env.PORT || 5000,()=>{
 console.log("Server is up and running")
})