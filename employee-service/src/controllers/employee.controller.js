const Employee = require("../models/employee.model");
const { verifyUserId } = require("../services/authService");
const mongoose = require("mongoose");

exports.createEmployee = async (req, res) => {
    try {
        const { userId, name, email, phone, department, designation, salary, address, managerId, documents } = req.body;

        if (!userId || !name || !email || !phone || !department || !designation || salary === undefined) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        if (salary < 0) {
            return res.status(400).json({
                message: "Salary cannot be negative",
            });
        }

        try {
            await verifyUserId(userId);
        } catch (error) {
            return res.status(400).json({
                message: error.message,
            });
        }

        const existingEmployee = await Employee.findOne({ userId, email });
        if (existingEmployee) {
            return res.status(409).json({
                message: "Employee with this email already exists for this user",
            });
        }

        if (managerId) {
            const managerExists = await Employee.findById(managerId);
            if (!managerExists) {
                return res.status(400).json({
                    message: "Manager not found",
                });
            }
        }

        const employee = await Employee.create({
            userId,
            name,
            email,
            phone,
            department,
            designation,
            salary,
            address,
            managerId,
            documents,
        });

        res.status(201).json({
            message: "Employee created successfully",
            employee,
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.query;
        let query = {};

        if (userId) {
            query.userId = userId;
        }

        const skip = (page - 1) * limit;

        const employees = await Employee.find(query).skip(skip).limit(Number(limit));
        const total = await Employee.countDocuments(query);

        res.status(200).json({
            message: "Employees fetched successfully",
            employees,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getSingleEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid employee ID",
            });
        }

        const employee = await Employee.findById(id).populate("managerId", "name designation");

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee fetched successfully",
            employee,
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid employee ID",
            });
        }

        if (updates.salary && updates.salary < 0) {
            return res.status(400).json({
                message: "Salary cannot be negative",
            });
        }

        if (updates.managerId) {
            const managerExists = await Employee.findById(updates.managerId);
            if (!managerExists) {
                return res.status(400).json({
                    message: "Manager not found",
                });
            }
        }

        const employee = await Employee.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee updated successfully",
            employee,
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid employee ID",
            });
        }

        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found",
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};
