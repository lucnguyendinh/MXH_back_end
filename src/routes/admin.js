const express = require('express')
const router = express.Router()

const adminController = require('../controller/adminController')

router.get('/getalluser', adminController.getAllUser)
router.post('/editeserrights', adminController.editEserRights)
router.get('/searchbyname', adminController.SearchByName)
router.get('/history', adminController.History)

module.exports = router
