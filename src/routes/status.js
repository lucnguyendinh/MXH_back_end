const express = require('express')
const router = express.Router()

const statusController = require('../controller/statusController')

router.post('/upstatus', statusController.upStatus)
router.post('/like', statusController.like)
router.delete('/unlike/:id', statusController.unLike)
router.post('/comment', statusController.comment)
router.delete('/comment/:id', statusController.deleteComment)
router.put('/likecomment', statusController.likeComment)
router.put('/unlikecomment', statusController.unLikeComment)
router.post('/share', statusController.share)
router.get('/getstatus', statusController.getStatus)
router.get('/getstatus/:iduser', statusController.getStatusByIdUser)
router.get('/getstatusbyid/:id', statusController.getStatusById)
router.get('/getlike/:id', statusController.getLike)
router.get('/getcomment/:id', statusController.getComment)
router.get('/getshare/:id', statusController.getShare)

module.exports = router
