const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");


const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

router.post("/", 
    authMiddleware, 
    authorize("ADMIN", "HR"), 
    employeeController.createEmployee);
router.get("/", 
    authMiddleware,
    authorize("ADMIN", "HR", "MANAGER"),
    employeeController.getAllEmployees);
router.get("/:id", 
    authMiddleware,
    employeeController.getSingleEmployee);

router.put("/:id", 
    authMiddleware,
    authorize("ADMIN", "HR"), 
    employeeController.updateEmployee);
router.delete("/:id", authMiddleware,
    authorize("ADMIN"), 
    employeeController.deleteEmployee);

module.exports = router;
