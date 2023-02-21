const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, UsersInfo } = require('../models')

let refreshTokens = []

const authController = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
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
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '20s' },
        )
    },

    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                _id: user._id,
                admin: user.admin,
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
                return res.status(404).json('Wrong number phone!')
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            )
            if (!validPassword) {
                return res.status(404).json('Wrong password!')
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false, //deloy doi thanh true
                    path: '/',
                    sameSite: 'strict',
                })
                const userInfo = await UsersInfo.findOne({
                    idUser: user._id,
                }).populate('idUser', 'sdt email admin')
                if (!userInfo) {
                    return res
                        .status(200)
                        .json({ user, accessToken, refreshToken })
                }
                return res
                    .status(200)
                    .json({ userInfo, accessToken, refreshToken })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json("You're not authenticated!")
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid')
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                return res.status(400).json(err)
            }
            refreshTokens = refreshTokens.filter(
                (token) => token != refreshToken,
            )
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            refreshTokens.push(newRefreshToken)
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false, //deloy doi thanh true
                path: '/',
                sameSite: 'strict',
            })
            return res.status(200).json({ accessToken: newAccessToken })
        })
    },

    //LOG OUT
    userLogout: async (req, res) => {
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter(
            (token) => token != req.cookies.refreshToken,
        )
        return res.status(200).json('Logged out!!')
    },
}

module.exports = authController
