const express = require('express')
const router = express.Router()

const messageController = require('../controller/messageController')
const middlewareController = require('../controller/middlewareController')

router.post('/createconversation', middlewareController.verifyToken, messageController.createConverSation)
router.get('/getmessage/:userId', middlewareController.verifyToken, messageController.getMessage)
router.post('/mess', middlewareController.verifyToken, messageController.mess)
router.get('/getmess/:conversationId', middlewareController.verifyToken, messageController.getMess)

module.exports = router
