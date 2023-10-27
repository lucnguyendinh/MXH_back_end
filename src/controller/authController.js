const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, UsersInfo, Token, NotificationAdmin, HistoryAdmin } = require('../models')

const authController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const email = await User.findOne({ email: req.body.email })
            const phoneNumber = await User.findOne({ sdt: req.body.sdt })
            if (email) {
                return res.status(404).json('Email này đã được sử dụng!')
            }
            if (phoneNumber) {
                return res.status(404).json('Số điện thoại này đã được sử dụng!')
            }
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            const newUser = new User({
                sdt: req.body.sdt,
                email: req.body.email,
                password: hashed,
            })

            //Save to db
            const user = await newUser.save()
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //REGISTER NEXT
    registerNext: async (req, res) => {
        try {
            const newUsersInfo = new UsersInfo({
                fullName: req.body.fullName,
                favorites: req.body.favorites,
                otherOf: req.body.otherOf,
                sex: req.body.sex,
                idUser: req.body.idUser,
            })

            //Save to db
            const users = await newUsersInfo.save()
            return res.status(200).json(users)
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

    //LOGIN
    loginUser: async (req, res) => {
        try {
            //compare user & password
            const user = await User.findOne({ sdt: req.body.sdt })

            if (!user) {
                return res.status(404).json('Số điện thoại không đúng!')
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.status(404).json('Sai mật khẩu!')
            }
            if (user && validPassword) {
                if (user.currentStatus === 3) {
                    return res.status(404).json('Tài khoản hiện đang bị khóa...')
                }
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)

                const token = await Token.findOneAndUpdate(
                    { user: user._id },
                    {
                        $push: { refreshTokens: refreshToken },
                    },
                )
                if (!token) {
                    const newToken = new Token({
                        refreshTokens: refreshToken,
                        user: user._id,
                    })
                    //Save to db
                    await newToken.save()
                }
                const userInfo = await UsersInfo.findOne({
                    idUser: user._id,
                }).populate('idUser', 'sdt email admin')
                if (!userInfo) {
                    return res.status(200).json({ user, accessToken, refreshToken })
                }
                return res.status(200).json({ userInfo, accessToken, refreshToken })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshTokenExtra = req.body.refreshToken
        if (!refreshTokenExtra) {
            return res.status(401).json("You're not authenticated!")
        }
        const token = await Token.findOne({ user: req.body.user })

        if (!token?.refreshTokens.includes(refreshTokenExtra)) {
            return res.status(403).json('Refresh token is not valid')
        }

        jwt.verify(refreshTokenExtra, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                return res.status(400).json(err)
            }
            await token.updateOne({
                $pull: { refreshTokens: refreshTokenExtra },
            })
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)

            await token.updateOne({
                $push: { refreshTokens: newRefreshToken },
            })
            return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
        })
    },

    //LOG OUT
    userLogout: async (req, res) => {
        await Token.findOneAndUpdate(
            { refreshTokens: req.cookies.refreshToken },
            {
                $pull: { refreshTokens: req.cookies.refreshToken },
            },
        )
        res.clearCookie('refreshToken')
        return res.status(200).json('Logged out!!')
    },
    //[GET] get user
    getUser: async (req, res) => {
        const userId = req.query.userId
        const fullName = req.query.fullName
        try {
            const user = userId
                ? await UsersInfo.findById(userId).populate('follow.followers').populate('follow.following')
                : await UsersInfo.findOne({ fullName: fullName })
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    //[GET] get all
    getAll: async (req, res) => {
        try {
            const users = await UsersInfo.find()
            return res.status(200).json(users)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = authController
