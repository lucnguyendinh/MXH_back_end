const express = require('express')
const router = express.Router()

const authController = require('../controller/authController')
const middlewareController = require('../controller/middlewareController')

router.post('/register', authController.registerUser)
router.post('/register1', authController.registerNext)
router.post('/login', authController.loginUser)
router.post('/refresh', authController.requestRefreshToken)
router.post('/logout', authController.userLogout)
router.get('/', authController.getUser)
router.get('/alluser', authController.getAll)

module.exports = router
