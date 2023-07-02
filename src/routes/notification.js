const express = require('express')
const router = express.Router()

const notificationController = require('../controller/notificationController')
const middlewareController = require('../controller/middlewareController')

router.get('/:idUser', middlewareController.verifyToken, notificationController.notification)
router.post('/like', middlewareController.verifyToken, notificationController.like)
router.post('/comment', middlewareController.verifyToken, notificationController.comment)
router.post('/share', middlewareController.verifyToken, notificationController.share)
router.put('/unlike', middlewareController.verifyToken, notificationController.unLike)
router.put('/uncomment', middlewareController.verifyToken, notificationController.unComment)
router.put('/unshare', middlewareController.verifyToken, notificationController.unShare)

module.exports = router
