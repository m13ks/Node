const WebSocket = require("ws")

const ws = new WebSocket("ws://localhost:8080")

let startTime

ws.on("open", () => {
  console.log("Підключено до WebSocket сервера")

  startTime = Date.now()
  console.log(`Початок отримання даних: ${startTime}`)
})

ws.on("message", (data) => {
  console.log(`Отримано дані розміром: ${data.length} байт`)

  const endTime = Date.now()
  console.log(`Кінець отримання даних: ${endTime}`)

  const duration = endTime - startTime
  console.log(`Час отримання даних: ${duration} мс`)
})
