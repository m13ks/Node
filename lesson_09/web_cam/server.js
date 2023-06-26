const express = require("express")
const http = require("http")
const socketIO = require("socket.io")
const logger = require("./logger/logger")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(__dirname + "/public"))

io.on("connection", (socket) => {
  logger.log("info", "Клієнт підключився")

  socket.on("image", (imageData) => {
    socket.broadcast.emit("image", imageData)
    logger.log("info", "Отримано нове зображення з вебкамери")
  })

  socket.on("disconnect", () => {
    logger.log("info", "Клієнт відключився")
  })
})

const port = 3000
server.listen(port, () => {
  logger.log("info", `Сервер запущено на порту ${port}`)
})
