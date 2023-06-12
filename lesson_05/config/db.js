const mongoose = require("mongoose")

const mongoDBUrl = "mongodb://test:test@localhost:27017/test"

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  }
}

module.exports = connectDB
