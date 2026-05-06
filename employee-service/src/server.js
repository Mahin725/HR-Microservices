const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.EMPLOYEE_SERVICE_PORT || 5002;

app.get('/',(req,res)=>{
    res.send({"status":"Success","message":"Employee Service is Running..."})
})

app.listen(port,()=>{
    console.log("Employee Service Running onPort",port);
})