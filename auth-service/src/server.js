const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const router = require('./routes/auth.routes');


app.use(cors());
app.use(express.json());


app.use("/auth",router);

app.get("/",(req,res)=>{
    res.send({status:"Success",message:"Server is Running"});
})



app.listen(port,()=>{
    console.log("AuthService is Running on Port ",port);
})
