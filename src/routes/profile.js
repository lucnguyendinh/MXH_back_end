const express = require('express')
const router = express.Router()

const profileController = require('../controller/profileController')
const middlewareController = require('../controller/middlewareController')

router.put('/edit', middlewareController.verifyToken, profileController.editProfile)
router.put('/upcoverimg', middlewareController.verifyToken, profileController.upCoverImg)
router.put('/upavtimg', middlewareController.verifyToken, profileController.upAvtImg)
router.put('/editother', middlewareController.verifyToken, profileController.editOther)
router.put('/follow', middlewareController.verifyToken, profileController.following)
router.put('/unfollow', middlewareController.verifyToken, profileController.unfollow)

module.exports = router
