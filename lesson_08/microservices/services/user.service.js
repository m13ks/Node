const { Service } = require("moleculer")
const User = require("../models/user")
const { generateToken, verifyToken } = require("../config/auth")
const { sequelize } = require("../config/db")

module.exports = {
  name: "users",
  mixins: [Service],

  actions: {
    listUsers: {
      async handler(ctx) {
        try {
          const users = await User.findAll()
          return users
        } catch (error) {
          console.error("Error retrieving users:", error)
          throw new Error("Internal server error")
        }
      },
    },

    createUser: {
      async handler(ctx) {
        try {
          const { name, password, role } = ctx.params
          const user = await User.create({ name, password, role })
          return user
        } catch (error) {
          console.error("Error creating user:", error)
          throw new Error("Internal server error")
        }
      },
    },

    updateUser: {
      async handler(ctx) {
        try {
          const { id, name, password, role } = ctx.params
          const user = await User.findByPk(id)
          if (!user) {
            throw new Error("User not found")
          }
          user.name = name
          user.password = password
          user.role = role
          await user.save()
          return user
        } catch (error) {
          console.error("Error updating user:", error)
          throw new Error("Internal server error")
        }
      },
    },

    deleteUser: {
      async handler(ctx) {
        try {
          const { id, role, password } = ctx.params
          if (role !== "Admin") {
            throw new Error("Only admins can delete users")
          }
          const user = await User.findByPk(id)
          if (!user) {
            throw new Error("User not found")
          }
          await user.destroy()
          return true
        } catch (error) {
          console.error("Error deleting user:", error)
          throw new Error("Internal server error")
        }
      },
    },

    listUserTokens: {
      async handler(ctx) {
        try {
          const { id } = ctx.params
          const tokens = await sequelize.query(
            "SELECT token FROM tokens WHERE userId = ?",
            {
              replacements: [id],
              type: sequelize.QueryTypes.SELECT,
            }
          )
          return tokens
        } catch (error) {
          console.error("Error retrieving user tokens:", error)
          throw new Error("Internal server error")
        }
      },
    },

    listAllTokens: {
      async handler(ctx) {
        try {
          const tokens = await sequelize.query("SELECT token FROM tokens", {
            type: sequelize.QueryTypes.SELECT,
          })
          return tokens
        } catch (error) {
          console.error("Error retrieving all tokens:", error)
          throw new Error("Internal server error")
        }
      },
    },

    createToken: {
      async handler(ctx) {
        try {
          const { id } = ctx.params
          const token = generateToken({ userId: id })
          await sequelize.query(
            "INSERT INTO tokens (userId, token) VALUES (?, ?)",
            {
              replacements: [id, token],
              type: sequelize.QueryTypes.INSERT,
            }
          )
          return token
        } catch (error) {
          console.error("Error creating token:", error)
          throw new Error("Internal server error")
        }
      },
    },

    updateToken: {
      async handler(ctx) {
        try {
          const { id, token } = ctx.params
          await sequelize.query(
            "UPDATE tokens SET token = ? WHERE userId = ?",
            {
              replacements: [token, id],
              type: sequelize.QueryTypes.UPDATE,
            }
          )
          return true
        } catch (error) {
          console.error("Error updating token:", error)
          throw new Error("Internal server error")
        }
      },
    },

    deleteToken: {
      async handler(ctx) {
        try {
          const { id } = ctx.params
          await sequelize.query("DELETE FROM tokens WHERE userId = ?", {
            replacements: [id],
            type: sequelize.QueryTypes.DELETE,
          })
          return true
        } catch (error) {
          console.error("Error deleting token:", error)
          throw new Error("Internal server error")
        }
      },
    },

    verifyToken: {
      async handler(ctx) {
        try {
          const { token } = ctx.params
          const decoded = verifyToken(token)
          return decoded
        } catch (error) {
          console.error("Error verifying token:", error)
          throw new Error("Invalid token")
        }
      },
    },
  },
}
