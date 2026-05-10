const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employee.routes');

const app = express();
const port = process.env.EMPLOYEE_SERVICE_PORT || 5002;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send({ "status": "Success", "message": "Employee Service is Running..." })
})

app.use('/employees', employeeRoutes);

app.listen(port, () => {
    console.log("Employee Service Running on Port", port);
})