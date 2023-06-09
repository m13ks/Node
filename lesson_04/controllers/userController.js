const User = require("../models/user")

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (error) {
      console.error("Error fetching users:", error)
      res.sendStatus(500)
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, password, role } = req.body
      const user = await User.create({ name, password, role })
      res.json(user)
    } catch (error) {
      console.error("Error creating user:", error)
      res.sendStatus(500)
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id
      await User.update(req.body, { where: { id: userId } })
      const updatedUser = await User.findByPk(userId)
      res.json(updatedUser)
    } catch (error) {
      console.error("Error updating user:", error)
      res.sendStatus(500)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id
      await User.destroy({ where: { id: userId } })
      res.sendStatus(200)
    } catch (error) {
      console.error("Error deleting user:", error)
      res.sendStatus(500)
    }
  },

  getUserTokens: async (req, res) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId)
      res.json(user.tokens)
    } catch (error) {
      console.error("Error fetching user tokens:", error)
      res.sendStatus(500)
    }
  },

  getAllTokens: async (req, res) => {
    try {
      const users = await User.findAll()
      const allTokens = users.reduce(
        (tokens, user) => [...tokens, ...user.tokens],
        []
      )
      res.json(allTokens)
    } catch (error) {
      console.error("Error fetching all tokens:", error)
      res.sendStatus(500)
    }
  },

  createToken: async (req, res) => {
    try {
      const userId = req.params.id
      const { token } = req.body
      const user = await User.findByPk(userId)
      user.tokens.push(token)
      await user.save()
      res.json({ token })
    } catch (error) {
      console.error("Error creating token:", error)
      res.sendStatus(500)
    }
  },

  updateToken: async (req, res) => {
    try {
      const userId = req.params.id
      const { token } = req.params
      const { newToken } = req.body
      const user = await User.findByPk(userId)
      const tokenIndex = user.tokens.indexOf(token)
      if (tokenIndex !== -1) {
        user.tokens[tokenIndex] = newToken
        await user.save()
        res.json({ newToken })
      } else {
        res.status(404).json({ error: "Token not found" })
      }
    } catch (error) {
      console.error("Error updating token:", error)
      res.sendStatus(500)
    }
  },

  deleteToken: async (req, res) => {
    try {
      const userId = req.params.id
      const { token } = req.params
      const user = await User.findByPk(userId)
      const tokenIndex = user.tokens.indexOf(token)
      if (tokenIndex !== -1) {
        user.tokens.splice(tokenIndex, 1)
        await user.save()
        res.sendStatus(200)
      } else {
        res.status(404).json({ error: "Token not found" })
      }
    } catch (error) {
      console.error("Error deleting token:", error)
      res.sendStatus(500)
    }
  },
}

module.exports = UserController
