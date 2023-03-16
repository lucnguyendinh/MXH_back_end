const express = require('express')
const router = express.Router()

const authController = require('../controller/authController')
const middlewareController = require('../controller/middlewareController')

router.post('/register', authController.registerUser)
router.post('/register1', authController.registerNext)
router.post('/login', authController.loginUser)
router.post('/refresh', authController.requestRefreshToken)
router.post('/logout', middlewareController.verifyToken, authController.userLogout)
router.get('/', authController.getUser)

module.exports = router
