const express = require('express')
const router = express.Router()

const statusController = require('../controller/statusController')
const middlewareController = require('../controller/middlewareController')

router.post('/upstatus', middlewareController.verifyToken, statusController.upStatus)
router.post('/like', middlewareController.verifyToken, statusController.like)
router.delete('/unlike/:id', middlewareController.verifyToken, statusController.unLike)
router.post('/comment', middlewareController.verifyToken, statusController.comment)
router.delete('/comment/:id', middlewareController.verifyToken, statusController.deleteComment)
router.put('/likecomment', middlewareController.verifyToken, statusController.likeComment)
router.put('/unlikecomment', middlewareController.verifyToken, statusController.unLikeComment)
router.post('/share', middlewareController.verifyToken, statusController.share)
router.get('/getstatus', middlewareController.verifyToken, statusController.getStatus)
router.get('/getstatus/:iduser', middlewareController.verifyToken, statusController.getStatusByIdUser)
router.get('/getstatusbyid/:id', middlewareController.verifyToken, statusController.getStatusById)
router.get('/getstatusbyvideo', statusController.getVideo)
router.get('/getnewfeed', statusController.getNewFeed)
router.get('/getlike/:id', middlewareController.verifyToken, statusController.getLike)
router.get('/getcomment/:id', middlewareController.verifyToken, statusController.getComment)

module.exports = router
