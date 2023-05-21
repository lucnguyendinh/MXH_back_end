const express = require('express')
const router = express.Router()

const messageController = require('../controller/messageController')

router.post('/createconversation', messageController.createConverSation)
router.get('/getmessage/:userId', messageController.getMessage)
router.post('/mess', messageController.mess)
router.get('/getmess/:conversationId', messageController.getMess)

module.exports = router
