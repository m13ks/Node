const http = require("http")

const startTime = Date.now()
console.log(`Початок отримання даних: ${startTime}`)

http.get("http://localhost:8080/data", (res) => {
  console.log(`Отримано дані розміром: ${res.headers["content-length"]} байт`)

  let data = Buffer.alloc(0)

  res.on("data", (chunk) => {
    data = Buffer.concat([data, chunk])
  })

  res.on("end", () => {
    const endTime = Date.now()
    console.log(`Кінець отримання даних: ${endTime}`)

    const duration = endTime - startTime
    console.log(`Час отримання даних: ${duration} мс`)
  })
})
