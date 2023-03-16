const express = require('express')
const router = express.Router()

const statusController = require('../controller/statusController')

router.post('/upstatus', statusController.upStatus)
router.post('/like', statusController.like)
router.delete('/unlike/:id', statusController.unLike)
router.post('/comment', statusController.comment)
router.get('/getstatus', statusController.getStatus)
router.get('/getlike/:id', statusController.getLike)
router.get('/getcomment/:id', statusController.getComment)
router.get('/getshare/:id', statusController.getShare)

module.exports = router
