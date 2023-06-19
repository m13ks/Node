const http = require("http")

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/data") {
    const data = generateLargeData(3 * 1024 * 1024)
    res.setHeader("Content-Type", "application/octet-stream")
    res.setHeader("Content-Length", data.length)
    res.end(data)
  } else {
    res.statusCode = 404
    res.end()
  }
})

function generateLargeData(sizeInBytes) {
  const buffer = Buffer.alloc(sizeInBytes)
  for (let i = 0; i < sizeInBytes; i++) {
    buffer[i] = Math.floor(Math.random() * 256)
  }
  return buffer
}

server.listen(8080, () => {
  console.log("HTTP polling сервер запущено на порту 8080")
})
