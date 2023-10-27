const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, UsersInfo, NotificationAdmin, HistoryAdmin, Token } = require('../models')

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
    SearchById: async (req, res) => {
        try {
            const userId = req.query.id
            // Kiểm tra xem userId có hợp lệ (là một ObjectId) hay không
            if (/^[0-9a-fA-F]{24}$/.test(userId)) {
                const user = await UsersInfo.find({ idUser: userId }).select('fullName avtImg.url idUser')
                return res.status(200).json(user)
            } else {
                return res.status(200).json([])
            }
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

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
                currentStatus: user.currentStatus,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '1d' },
        )
    },

    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
                currentStatus: user.currentStatus,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '365d' },
        )
    },

    Login: async (req, res) => {
        try {
            const admin = await User.findOne({ sdt: req.body.phoneNumber })
            const checkAdmin = admin?.admin

            if (!admin || !checkAdmin) {
                return res.status(404).json('Số điện thoại không đúng!')
            }
            const validPassword = await bcrypt.compare(req.body.password, admin.password)
            if (!validPassword) {
                return res.status(404).json('Sai mật khẩu!')
            }
            if (admin && validPassword) {
                if (admin.currentStatus === 3) {
                    return res.status(404).json('Tài khoản hiện đang bị khóa...')
                }
                const accessToken = adminController.generateAccessToken(admin)
                const refreshToken = adminController.generateRefreshToken(admin)

                const token = await Token.findOneAndUpdate(
                    { user: admin._id },
                    {
                        $push: { refreshTokens: refreshToken },
                    },
                )
                if (!token) {
                    const newToken = new Token({
                        refreshTokens: refreshToken,
                        user: admin._id,
                    })
                    //Save to db
                    await newToken.save()
                }
                const userInfo = await UsersInfo.findOne({
                    idUser: admin._id,
                }).populate('idUser', 'sdt email admin')
                if (!userInfo) {
                    return res.status(200).json({ admin, accessToken, refreshToken })
                }
                return res.status(200).json({ userInfo, accessToken, refreshToken })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = adminController
