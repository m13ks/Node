const User = require("../models/user")

const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      console.error("Error fetching users:", error)
      res.sendStatus(500)
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, password, role } = req.body
      const user = new User({ name, password, role })
      await user.save()
      res.json(user)
    } catch (error) {
      console.error("Error creating user:", error)
      res.sendStatus(500)
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.id
      const { name, password, role } = req.body
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, password, role },
        { new: true }
      )
      res.json(updatedUser)
    } catch (error) {
      console.error("Error updating user:", error)
      res.sendStatus(500)
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id
      await User.findByIdAndDelete(userId)
      res.sendStatus(200)
    } catch (error) {
      console.error("Error deleting user:", error)
      res.sendStatus(500)
    }
  },

  getUserTokens: async (req, res) => {
    try {
      const userId = req.params.id
      const user = await User.findById(userId)
      res.json(user.tokens)
    } catch (error) {
      console.error("Error fetching user tokens:", error)
      res.sendStatus(500)
    }
  },

  getAllTokens: async (req, res) => {
    try {
      const users = await User.find()
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
      const user = await User.findById(userId)
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
      const user = await User.findById(userId)
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
      const user = await User.findById(userId)
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
