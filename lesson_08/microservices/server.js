const { ServiceBroker } = require("moleculer")
const UserService = require("./services/user.service")
const AuthService = require("./services/auth.service")
const DatabaseService = require("./services/database.service")
const GatewayService = require("./services/gateway.service")

const broker = new ServiceBroker()

broker.createService(UserService)
broker.createService(AuthService)
broker.createService(DatabaseService)
broker.createService(GatewayService)

broker
  .start()
  .then(() => {
    console.log("Microservices are running")
  })
  .catch((error) => {
    console.error("Error starting broker:", error)
    process.exit(1)
  })
