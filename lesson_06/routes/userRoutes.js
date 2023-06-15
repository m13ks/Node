const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

router.post("/login", UserController.loginUser)

router.get("/", UserController.validateToken, UserController.getUsers)
router.put("/:id", UserController.validateToken, UserController.updateUser)
router.delete("/:id", UserController.validateToken, UserController.deleteUser)
router.get(
  "/:id/tokens",
  UserController.validateToken,
  UserController.getUserTokens
)
router.get("/tokens", UserController.validateToken, UserController.getAllTokens)
router.post(
  "/:id/tokens",
  UserController.validateToken,
  UserController.createToken
)
router.put(
  "/:id/tokens/:token",
  UserController.validateToken,
  UserController.updateToken
)
router.delete(
  "/:id/tokens/:token",
  UserController.validateToken,
  UserController.deleteToken
)

module.exports = router
