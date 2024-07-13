const express = require('express')
const router = express.Router()

const sendMailController = require('../controller/sendMailController')

router.post('/sendMail', sendMailController.send)

module.exports = router
