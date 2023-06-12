const { UsersInfo } = require('../models')
const cloudinary = require('../utils/cloudinary')

const profileController = {
    upCoverImg: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.body.coverImg, {
                folder: 'imgCover',
            })
            await UsersInfo.findByIdAndUpdate(req.body.idUser, {
                coverImg: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    upAvtImg: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.body.avtImg, {
                folder: 'imgAvt',
            })
            await UsersInfo.findByIdAndUpdate(req.body.idUser, {
                avtImg: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    editOther: async (req, res) => {
        try {
            await UsersInfo.findByIdAndUpdate(req.body.idUser, {
                otherOf: req.body.otherOf,
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    editProfile: async (req, res) => {
        try {
            const resultAvt = await cloudinary.uploader.upload(req.body.avtImg, {
                folder: 'imgAvt',
            })
            const resultCover = await cloudinary.uploader.upload(req.body.coverImg, {
                folder: 'imgCover',
            })
            await UsersInfo.findByIdAndUpdate(req.body.idUser, {
                avtImg: {
                    public_id: resultAvt.public_id,
                    url: resultAvt.secure_url,
                },
                coverImg: {
                    public_id: resultCover.public_id,
                    url: resultCover.secure_url,
                },
                fullName: req.body.fullName,
                favorites: req.body.favorites,
                otherOf: req.body.otherOf,
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    following: async (req, res) => {
        try {
            const check = await UsersInfo.findOne({ _id: req.body.id, 'follow.followers': { $in: [req.body.user] } })
            if (check) {
                return res.status(400).json('ban da follow nguoi nay')
            }
            await UsersInfo.findByIdAndUpdate(req.body.id, {
                $push: { 'follow.followers': req.body.user },
            })
            await UsersInfo.findByIdAndUpdate(req.body.user, {
                $push: { 'follow.following': req.body.id },
            })
            const followers = await UsersInfo.findById(req.body.id)
                .populate('follow.followers')
                .populate('follow.following')
            return res.status(200).json(followers)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unfollow: async (req, res) => {
        try {
            const check = await UsersInfo.findOne({ _id: req.body.id, 'follow.followers': { $in: [req.body.user] } })
            if (!check) {
                return res.status(400).json('ban chua follow nguoi nay')
            }
            await UsersInfo.findByIdAndUpdate(req.body.id, {
                $pull: { 'follow.followers': req.body.user },
            })
            await UsersInfo.findByIdAndUpdate(req.body.user, {
                $pull: { 'follow.following': req.body.id },
            })
            const followers = await UsersInfo.findById(req.body.id)
                .populate('follow.followers')
                .populate('follow.following')
            return res.status(200).json(followers)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = profileController
