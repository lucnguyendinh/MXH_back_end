const express = require('express')
const router = express.Router()

const message = require('../controller/message')

router.post('/createconversation', message.createConverSation)
router.get('/getmessage/:userId', message.getMessage)
router.post('/mess', message.mess)
router.get('/getmess/:conversationId', message.getMess)

module.exports = router
