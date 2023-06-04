const express = require('express')
const router = express.Router()

const notificationController = require('../controller/notificationController')

router.get('/:idUser', notificationController.notification)
router.post('/like', notificationController.like)
router.post('/comment', notificationController.comment)
router.post('/share', notificationController.share)
router.put('/unlike', notificationController.unLike)
router.put('/uncomment', notificationController.unComment)
router.put('/unshare', notificationController.unShare)

module.exports = router
