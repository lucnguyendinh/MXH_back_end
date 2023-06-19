const { Notification } = require('../models')

const notificationController = {
    notification: async (req, res) => {
        try {
            const notifi = await Notification.find({ idUser: req.params.idUser })
                .sort({ createdAt: -1 })
                .populate('idOther')
            return res.status(200).json(notifi)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    like: async (req, res) => {
        try {
            const check = await Notification.findOne({
                idStatus: req.body.idStatus,
                action: 1,
                idOther: { $in: [req.body.idOther] },
            })
            const status = await Notification.findOne({ idStatus: req.body.idStatus, action: 1 })

            if (check) {
                return res.status(400).json('Ban da like bai nay r...')
            }
            //neu k co ai like
            if (!status) {
                const likeNotifi = new Notification({
                    idUser: req.body.idUser,
                    idOther: req.body.idOther,
                    idStatus: req.body.idStatus,
                    action: 1,
                })
                await likeNotifi.save()
                return res.status(200).json('done')
            }
            await status.updateOne({
                $push: { idOther: req.body.idOther },
                count: status.count + 1,
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    comment: async (req, res) => {
        try {
            const status = await Notification.findOne({ idStatus: req.body.idStatus, action: 2 })
            if (!status) {
                const commentNotifi = new Notification({
                    idUser: req.body.idUser,
                    idOther: req.body.idOther,
                    idStatus: req.body.idStatus,
                    action: 2,
                })
                await commentNotifi.save()
                return res.status(200).json('done')
            }
            await status.updateOne({
                $push: { idOther: req.body.idOther },
                count: status.count + 1,
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    share: async (req, res) => {
        try {
            const status = await Notification.findOne({ idStatus: req.body.idStatus, action: 3 })
            if (!status) {
                const shareNotifi = new Notification({
                    idUser: req.body.idUser,
                    idOther: req.body.idOther,
                    idStatus: req.body.idStatus,
                    action: 3,
                })
                await shareNotifi.save()
                return res.status(200).json('done')
            }
            await status.updateOne({
                $push: { idOther: req.body.idOther },
                count: status.count + 1,
            })
            return res.status(200).json('done')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unLike: async (req, res) => {
        try {
            const status = await Notification.findOne({
                idStatus: req.body.idStatus,
                action: 1,
                idOther: { $in: [req.params.idOther] },
            })
            if (!status) {
                return res.status(400).json('Ban chua like bai viet nay...')
            }
            await status.updateOne({
                $pull: { idOther: req.body.idOther },
                count: status.count - 1,
            })

            return res.status(200).json('Da xoa')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unComment: async (req, res) => {
        try {
            const status = await Notification.findOne({ idStatus: req.body.idStatus, action: 2 })
            // await status.updateOne({
            //     $pull: { idOther: { $elemMatch: { $eq: req.body.idOther } } },
            //     count: status.count - 1,
            // })
            if (status) {
                const array = status.idOther
                const lastIndex = array.indexOf(req.body.idOther)

                if (lastIndex !== -1) {
                    array.splice(lastIndex, 1)
                    await status.updateOne({ $set: { idOther: array }, count: status.count - 1 })
                }
            }
            return res.status(200).json('Da xoa')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unShare: async (req, res) => {
        try {
            const status = await Notification.findOne({ idStatus: req.body.idStatus, action: 3 })
            await status.updateOne({
                $pull: { idOther: req.body.idOther },
                count: status.count - 1,
            })
            return res.status(200).json('Da xoa')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = notificationController
