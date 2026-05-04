const express = require('express');
const app = express();
const port = 5001;

app.get("/",(req,res)=>{
    res.send({status:"Success",message:"Server is Running"});
})

app.listen(port,()=>{
    console.log("AuthService is Running on Port ",port);
})
