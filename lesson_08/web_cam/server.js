const express = require("express")
const http = require("http")
const socketIO = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(__dirname + "/public"))

io.on("connection", (socket) => {
  console.log("Клієнт підключився")

  socket.on("image", (imageData) => {
    socket.broadcast.emit("image", imageData)
  })

  socket.on("disconnect", () => {
    console.log("Клієнт відключився")
  })
})

const port = 3000
server.listen(port, () => {
  console.log(`Сервер запущено на порту ${port}`)
})
