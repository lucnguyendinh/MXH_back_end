const { Status, Like, Share, Comment } = require('../models')
const cloudinary = require('../utils/cloudinary')

const statusController = {
    //UP STATUS
    upStatus: async (req, res) => {
        try {
            let result
            let newStatus
            if (req.body.img) {
                result = await cloudinary.uploader.upload(req.body.img, {
                    folder: 'img',
                })
                newStatus = new Status({
                    user: req.body.user,
                    content: req.body.content,
                    img: result.secure_url,
                    shareW: req.body.shareW,
                })
            } else {
                newStatus = new Status({
                    user: req.body.user,
                    content: req.body.content,
                    shareW: req.body.shareW,
                })
            }

            const status = await newStatus.save()
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //Like
    like: async (req, res) => {
        try {
            const checkLiked = await Like.find({
                status: req.body.status,
                user: req.body.user,
            })

            if (checkLiked.length >= 1) {
                return res.status(400).json('error')
            }

            const newLike = new Like({
                status: req.body.status,
                user: req.body.user,
            })

            const like = await (await newLike.save()).populate('user')

            const status = Status.findById(req.body.status)
            await status.updateOne({ $push: { like: like._id } })

            return res.status(200).json(like)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //UN LIKE
    unLike: async (req, res) => {
        try {
            await Like.findByIdAndDelete(req.params.id)
            const status = Status.find({ like: req.params.id })
            await status.updateOne({ $pull: { like: req.params.id } })
            return res.status(200).json('Deleted!!!')
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //COMMENT
    comment: async (req, res) => {
        try {
            const newComment = new Comment({
                status: req.body.status,
                user: req.body.user,
                content: req.body.content,
            })
            const comment = await (await newComment.save()).populate('user')
            if (req.body.status) {
                const status = Status.findById(req.body.status)
                await status.updateOne({ $push: { comment: comment._id } })
            }
            return res.status(200).json(comment)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deleteComment: async (req, res) => {
        try {
            await Comment.findByIdAndDelete(req.params.id)
            return res.status(200).json('Delete success')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    share: async (req, res) => {
        try {
            const newStatus = new Status({
                user: req.body.user,
                content: req.body.content,
                idStatus: req.body.idStatus,
                shareW: req.body.shareW,
            })
            const status = await newStatus.save()
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //GET STATUS
    getStatus: async (req, res) => {
        try {
            const status = await Status.find()
                .populate('user')
                .populate({
                    path: 'idStatus',
                    select: 'content img user shareW createdAt',
                    populate: {
                        path: 'user',
                    },
                })
            //.populate('idStatus', 'content img user shareW createdAt')
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //GET STATUS BY ID
    getStatusByIdUser: async (req, res) => {
        try {
            const status = await Status.find({ user: req.params.iduser }).populate('user')
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    getStatusById: async (req, res) => {
        try {
            const status = await Status.findById(req.params.id).populate('user')
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    getLike: async (req, res) => {
        try {
            const like = await Like.find({ status: req.params.id }).populate('user')
            return res.status(200).json(like)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getComment: async (req, res) => {
        try {
            const comment = await Comment.find({ status: req.params.id }).populate('user')
            return res.status(200).json(comment)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getShare: async (req, res) => {
        try {
            const share = await Share.find({ status: req.params.id }).populate('user')
            return res.status(200).json(share)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = statusController
