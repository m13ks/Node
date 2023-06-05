const express = require("express")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = express()

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for the API endpoints",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./server.js"],
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.listen(4000, () => {
  console.log("Swagger UI is running on http://localhost:4000/api-docs")
})
