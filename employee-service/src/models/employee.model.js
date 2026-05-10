const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            sparse: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            required: true,
            trim: true,
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: Number,
            required: true,
            min: 0,
        },

        address: {
            type: String,
            optional: true,
            trim: true,
        },

        documents: [
            {
                documentType: String,
                fileUrl: String,
                uploadDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
            optional: true,
        },
    },
    {
        timestamps: true,
    }
);

employeeSchema.index({ userId: 1, email: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Employee", employeeSchema);
