const express = require("express")
const userController = require("../controllers/userController")
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()

router
  .route("/")
  .get(userController.getAllUsers)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("admin"),
    userController.createUser,
  )

router.post("/login", authController.login)
router.post("/signup", authController.signup)

router
  .route("/:id")
  .get(authMiddleware.protect, userController.getUser)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo("admin"),
    userController.deleteUser,
  )

module.exports = router
