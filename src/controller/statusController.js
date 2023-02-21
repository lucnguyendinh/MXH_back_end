const { Status, Like, Share, Comment } = require('../models')

const statusController = {
    //UP STATUS
    upStatus: async (req, res) => {
        try {
            const newStatus = new Status({
                user: req.body.user,
                content: req.body.content,
                img: req.body.img,
                shareW: req.body.shareW,
            })
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

            const like = await newLike.save()

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
            const comment = await newComment.save()
            if (req.body.status) {
                const status = Status.findById(req.body.status)
                await status.updateOne({ $push: { comment: comment._id } })
            }
            return res.status(200).json(comment)
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
                    path: 'like',
                    populate: {
                        path: 'user',
                        model: 'Userinfo',
                    },
                })
                .populate({
                    path: 'comment',
                    populate: {
                        path: 'user',
                        model: 'Userinfo',
                    },
                })
                .populate({
                    path: 'share',
                    populate: {
                        path: 'user',
                        model: 'Userinfo',
                    },
                })
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = statusController
