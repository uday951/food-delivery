const express=require("express");
const dotEnv= require("dotenv");
const mongoose =require("mongoose");
const vendorrouts=require("./routes/vendorrouts")
const bodyParser=require("body-parser")
const firmRoutes= require('./routes/firmRouts')
const productroutes= require("./routes/productRoutes")
const PORT=4000;
dotEnv.config();
const app=express()
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongoose connecterd successfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json());

app.use('/vendor',vendorrouts);
app.use('/firm',firmRoutes)
app.use('/product',productroutes)
app.listen(PORT,()=>{
    console.log(`welcome to the port ${PORT}`)
})
app.use('/home',(req,res)=>{
    res.send("<h1>hi this is uday</h1>")
}

)




