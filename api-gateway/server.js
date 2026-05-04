const express = require('express');
const app = express();
const port = 5000;

app.get("/server-health",async(req,res)=>{
    res.send({status:"Success",message:"Server is running"});
})


app.listen(port,()=>{
    console.log("API GateWay Is Successfully Started.. Port ",port);
})