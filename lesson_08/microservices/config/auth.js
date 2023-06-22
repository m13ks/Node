const jwt = require("jsonwebtoken")

const secretKey = "super-puper-secret-key"

const generateToken = (data) => {
  return jwt.sign(data, secretKey, { expiresIn: "1h" })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey)
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
