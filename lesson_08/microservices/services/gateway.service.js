const { ServiceBroker } = require("moleculer")
const ApiGatewayService = require("moleculer-web")

const broker = new ServiceBroker()

broker.createService({
  name: "gateway",
  mixins: [ApiGatewayService],
  settings: {
    routes: [
      {
        path: "/api",
        aliases: {
          "POST /users/login": "users.loginUser",
          "GET /users": "users.listUsers",
          "POST /users": "users.createUser",
          "PUT /users/:id": "users.updateUser",
          "DELETE /users/:id": "users.deleteUser",
          "GET /users/:id/tokens": "users.listUserTokens",
          "GET /tokens": "users.listAllTokens",
          "POST /users/:id/tokens": "users.createToken",
          "PUT /users/:id/tokens": "users.updateToken",
          "DELETE /users/:id/tokens": "users.deleteToken",
        },
      },
    ],
  },
})

broker.start()
