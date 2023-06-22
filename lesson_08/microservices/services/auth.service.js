const { Service } = require("moleculer")
const { verifyToken } = require("../config/auth")

module.exports = {
  name: "auth",
  mixins: [Service],

  actions: {
    validateToken: {
      async handler(ctx) {
        const token = ctx.meta.token
        if (token) {
          const decoded = verifyToken(token)
          if (decoded) {
            ctx.meta.userId = decoded.userId
            return true
          } else {
            throw new Error("Invalid token")
          }
        } else {
          throw new Error("Token not provided")
        }
      },
    },
  },
}
