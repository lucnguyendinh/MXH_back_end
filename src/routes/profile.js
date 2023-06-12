const express = require('express')
const router = express.Router()

const profileController = require('../controller/profileController')

router.put('/edit', profileController.editProfile)
router.put('/upcoverimg', profileController.upCoverImg)
router.put('/upavtimg', profileController.upAvtImg)
router.put('/editother', profileController.editOther)
router.put('/follow', profileController.following)
router.put('/unfollow', profileController.unfollow)

module.exports = router
