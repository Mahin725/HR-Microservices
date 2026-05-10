const http = require("http");
const mongoose = require("mongoose");

const verifyUserId = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId format");
    }

    return new Promise((resolve, reject) => {
        const authServiceUrl = process.env.AUTH_SERVICE_URL || "http://localhost:5001";

        const url = new URL(`${authServiceUrl}/verify/${userId}`);

        const request = http.get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode === 200) {
                        resolve(parsed);
                    } else {
                        reject(new Error(`Invalid userId: ${parsed.message || "User not found"}`));
                    }
                } catch (error) {
                    if (res.statusCode === 404) {
                        reject(new Error("User not found"));
                    } else {
                        reject(new Error("Failed to verify userId with Auth Service"));
                    }
                }
            });
        });

        request.on("error", (error) => {
            reject(new Error(`Auth Service verification failed: ${error.message}`));
        });

        request.setTimeout(5000, () => {
            request.destroy();
            reject(new Error("Auth Service verification timeout"));
        });
    });
};

module.exports = { verifyUserId };

