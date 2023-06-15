const express = require("express")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const connectDB = require("./config/db")

const app = express()
const port = 3000

app.use(bodyParser.json())

connectDB()

app.use("/users", userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
