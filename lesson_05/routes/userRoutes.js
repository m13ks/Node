const express = require("express")
const UserController = require("../controllers/userController")

const router = express.Router()

router.get("/", UserController.getUsers)
router.post("/", UserController.createUser)
router.put("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)
router.get("/:id/tokens", UserController.getUserTokens)
router.get("/tokens", UserController.getAllTokens)
router.post("/:id/tokens", UserController.createToken)
router.put("/:id/tokens/:token", UserController.updateToken)
router.delete("/:id/tokens/:token", UserController.deleteToken)

module.exports = router
