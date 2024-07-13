const express = require('express')
const router = express.Router()

const adminController = require('../controller/adminController')

router.get('/getalluser', adminController.getAllUser)
router.post('/editeserrights', adminController.editEserRights)
router.get('/searchbyname', adminController.SearchByName)
router.get('/searchbyid', adminController.SearchById)
router.get('/history', adminController.History)
router.post('/login', adminController.Login)

module.exports = router
