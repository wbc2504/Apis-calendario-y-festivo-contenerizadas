const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  port: Number(process.env.PORT || 3000),
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/calendario_laboral",
  jwtSecret:
    process.env.JWT_SECRET ||
    "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30m",
};

module.exports = { env };
