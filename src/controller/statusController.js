const { Status, Like, Share, Comment } = require('../models')
const cloudinary = require('../utils/cloudinary')

const statusController = {
    //UP STATUS
    upStatus: async (req, res) => {
        try {
            let result
            let newStatus
            const media = req.body.media
            if (media) {
                if (media.startsWith('data:image/')) {
                    result = await cloudinary.uploader.upload(media, {
                        folder: 'img',
                        resource_type: 'auto',
                    })
                    newStatus = new Status({
                        user: req.body.user,
                        content: req.body.content,
                        img: result.secure_url,
                        shareW: req.body.shareW,
                    })
                } else if (media.startsWith('data:video/')) {
                    result = await cloudinary.uploader.upload(media, {
                        folder: 'video',
                        resource_type: 'auto',
                    })
                    newStatus = new Status({
                        user: req.body.user,
                        content: req.body.content,
                        video: result.secure_url,
                        shareW: req.body.shareW,
                    })
                }
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
                const status = await Status.findById(req.body.status)
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
    likeComment: async (req, res) => {
        try {
            const check = await Comment.findOne({ _id: req.body.id, 'numberLike.user': { $in: [req.body.user] } })
            if (check) {
                return res.status(400).json('ban da like comment nay r')
            }
            const comment = await Comment.findById(req.body.id)
            await comment.updateOne({
                $set: { 'numberLike.count': comment.numberLike.count + 1 },
                $push: { 'numberLike.user': req.body.user },
            })
            const comment1 = await Comment.find({ status: req.body.status }).populate('user')
            return res.status(200).json(comment1)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unLikeComment: async (req, res) => {
        try {
            const comment = await Comment.findOne({ _id: req.body.id, 'numberLike.user': { $in: [req.body.user] } })
            if (!comment) {
                return res.status(400).json('ban chua like comment nay')
            }
            await comment.updateOne({
                $set: { 'numberLike.count': comment.numberLike.count - 1 },
                $pull: { 'numberLike.user': req.body.user },
            })
            const comment1 = await Comment.find({ status: req.body.status }).populate('user')
            return res.status(200).json(comment1)
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
            const share = await newStatus.save()
            if (req.body.idStatus) {
                const status = await Status.findById(req.body.idStatus)
                await status.updateOne({ $push: { share: share._id } })
            }
            return res.status(200).json(share)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //GET STATUS
    getStatus: async (req, res) => {
        try {
            const status = await Status.aggregate([
                {
                    $sample: { size: 8 },
                },
                {
                    $lookup: {
                        from: 'userinfos',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: {
                        path: '$user',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'status',
                        localField: 'idStatus',
                        foreignField: '_id',
                        as: 'idStatus',
                    },
                },
                {
                    $unwind: {
                        path: '$idStatus',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'userinfos',
                        localField: 'idStatus.user',
                        foreignField: '_id',
                        as: 'idStatusUser',
                    },
                },
                {
                    $unwind: {
                        path: '$idStatusUser',
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ])
            // const status = await Status.find()
            //     .populate('user')
            // .populate({
            //     path: 'idStatus',
            //     select: 'content img user shareW createdAt',
            //     populate: {
            //         path: 'user',
            //     },
            // })
            return res.status(200).json(status)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //GET STATUS BY ID
    getStatusByIdUser: async (req, res) => {
        try {
            const status = await Status.find({ user: req.params.iduser })
                .sort({ createdAt: -1 })
                .populate('user')
                .populate({
                    path: 'idStatus',
                    select: 'content img user shareW createdAt',
                    populate: {
                        path: 'user',
                        select: 'avtImg fullName',
                    },
                })
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
            const comment = await Comment.find({ status: req.params.id }).sort({ createdAt: -1 }).populate('user')
            return res.status(200).json(comment)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = statusController
