const generateToken  = require("../helperFuntion/GenerateJWT");
const User = require("../model/user.model");


exports.register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // create user
        const user = await User.create({
            email,
            password,
            role,
        });
        console.log(user)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log("error: ",error);
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};


// 🔐 LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // check active
        if (!user.isActive) {
            return res.status(403).json({
                message: "User is blocked",
            });
        }

        // compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // generate token
        const token = generateToken(user);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// 🔍 VERIFY USER ID
exports.verify = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "User verified successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
};
