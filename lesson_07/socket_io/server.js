const io = require("socket.io")(3000)

io.on("connection", (socket) => {
  console.log("Клієнт підключився")

  socket.on("message", (message) => {
    console.log(`Повідомлення від клієнта: ${message}`)

    socket.emit("response", "Отримано повідомлення")
  })

  socket.on("disconnect", () => {
    console.log("Клієнт відключився")
  })
})
