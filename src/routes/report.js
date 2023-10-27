const express = require('express')
const router = express.Router()

const reportController = require('../controller/reportController')
const middlewareController = require('../controller/middlewareController')

router.post('/', reportController.reportStatus)
router.get('/', reportController.getReport)

module.exports = router
