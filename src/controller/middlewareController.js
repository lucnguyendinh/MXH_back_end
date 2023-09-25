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
            if (req.user._id == req.params.id || req.user.admin) {
                next() 
            } else {
                return res
                    .status(403)
                    .json("You're not a allowed to delete other")
            }
        })
    },
    verifyAccount: (req, res, next) => {
        
    }
}

module.exports = middlewareController
