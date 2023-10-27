const jwt = require('jsonwebtoken')

const middlewareController = {
    //verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json('Token is not valid')
                }
                req.user = user
                next()
            })
        } else {
            return res.status(401).json("You're not authenticated")
        }
    },

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user._id === req.body.id || req.user.admin) {
                next()
            } else {
                return res.status(403).json('Không thể xác thực !!!')
            }
        })
    },
    verifyTokenAndAdminAuthActive: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user._id === req.body.id || req.user.admin) {
                if (req.user.currentStatus === 2) {
                    return res.status(403).json('Tài khoản đang bị hạn chế !!!')
                } else {
                    next() // Cho phép yêu cầu tiếp tục xử lý
                }
            } else {
                return res.status(403).json('Không thể xác thực !!!')
            }
        })
    },
}

module.exports = middlewareController
