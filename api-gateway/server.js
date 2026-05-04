const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
require("dotenv").config();

const app = express();
const port = 5000;

// This is root for auth Service.
app.use("/api/auth",createProxyMiddleware({
    target:process.env.AUTHSERVICESURL,
    changeOrigin:true,
}))

app.get("/server-health",async(req,res)=>{
    res.send({status:"Success",message:"Server is running"});
})


app.listen(port,()=>{
    console.log("API GateWay Is Successfully Started.. Port ",port);
})