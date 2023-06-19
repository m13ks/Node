const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 8080 })

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Повідомлення отримано: ${message}`)
  })

  const data = generateLargeData(3 * 1024 * 1024)
  ws.send(data)
})

function generateLargeData(sizeInBytes) {
  const buffer = Buffer.alloc(sizeInBytes)
  for (let i = 0; i < sizeInBytes; i++) {
    buffer[i] = Math.floor(Math.random() * 256)
  }
  return buffer
}
