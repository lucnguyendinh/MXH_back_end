const { User, UsersInfo, NotificationAdmin, HistoryAdmin } = require('../models')

const adminController = {
    getAllUser: async (req, res) => {
        try {
            const totalRecords = await UsersInfo.countDocuments()

            const resultsPerPage = 10

            const totalPages = Math.ceil(totalRecords / resultsPerPage)

            const page = parseInt(req.query.page) || 1

            if (page > totalPages) {
                return res.status(400).json({ message: 'Trang yêu cầu không hợp lệ.' })
            }

            const users = await UsersInfo.find()
                .select('fullName avtImg.url sex idUser idUser')
                .populate('idUser')
                .skip((page - 1) * resultsPerPage)
                .limit(resultsPerPage)
            return res.status(200).json({ users, totalPages })
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    editEserRights: async (req, res) => {
        try {
            const newHistoryAdmin = new HistoryAdmin({
                idAdmin: req.body.idAdmin,
                idUser: req.body.idUser,
                status: req.body.code,
            })
            await User.findByIdAndUpdate(req.body.idUser, { currentStatus: req.body.code })
            await newHistoryAdmin.save()
            return res.status(200).json('edit success')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    GrantAdminRights: async (req, res) => {
        try {
            const newHistoryAdmin = new HistoryAdmin({
                idAdmin: req.body.id,
                idUser: req.body.user,
                status: 4,
            })
            await User.findByIdAndUpdate(req.body.user, { admin: true })
            await newHistoryAdmin.save()
            return res.status(200).json('grant success')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    SearchByName: async (req, res) => {
        try {
            const user = await UsersInfo.find({ fullName: { $regex: req.query.name, $options: 'i' } }).select(
                'fullName avtImg.url idUser',
            ) //$options khong phan biet chu hoa chu thuong
            // .select('fullName avtImg idUser')
            // .populate('idUser')
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    History: async (req, res) => {
        try {
            // Tính tổng số lượng bản ghi trong cơ sở dữ liệu
            const totalRecords = await HistoryAdmin.countDocuments()

            const resultsPerPage = 20

            const totalPages = Math.ceil(totalRecords / resultsPerPage)

            const page = parseInt(req.query.page) || 1

            if (page > totalPages) {
                return res.status(400).json({ message: 'Trang yêu cầu không hợp lệ.' })
            }

            const history = await HistoryAdmin.find()
                .sort({ createdAt: -1 })
                .skip((page - 1) * resultsPerPage)
                .limit(resultsPerPage)
            return res.status(200).json({ history, totalPages })
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = adminController
