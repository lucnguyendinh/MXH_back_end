const express = require('express')
const router = express.Router()

const lixiController = require('../controller/lixiController')

router.post('/', lixiController.lixi)
router.get('/', lixiController.getLixi)

module.exports = router
