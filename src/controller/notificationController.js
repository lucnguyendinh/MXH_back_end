const { Notification, Status } = require('../models')

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
            const status = await Status.findById(req.body.idStatus)
            if (status.user == req.body.idOther) {
                return res.status(200).json('Status cua ban...')
            }
            const check = await Notification.findOne({
                idStatus: req.body.idStatus,
                action: 1,
                idOther: { $in: [req.body.idOther] },
            })
            const statusNotifi = await Notification.findOne({ idStatus: req.body.idStatus, action: 1 })

            if (check) {
                return res.status(400).json('notification: Ban da like bai nay r...')
            }
            //neu k co ai like
            if (!statusNotifi) {
                const likeNotifi = new Notification({
                    idUser: req.body.idUser,
                    idOther: req.body.idOther,
                    idStatus: req.body.idStatus,
                    action: 1,
                })
                const a = await likeNotifi.save()
                return res.status(200).json('notification: like a')
            }
            const b = await statusNotifi.updateOne({
                $push: { idOther: req.body.idOther },
                count: statusNotifi.count + 1,
            })
            return res.status(200).json('notification: like b')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unLike: async (req, res) => {
        try {
            const status = await Status.findById(req.body.idStatus)
            if (status.user == req.body.idOther) {
                return res.status(200).json('Status cua ban...')
            }
            const statusNotifi = await Notification.findOne({
                idStatus: req.body.idStatus,
                action: 1,
                idOther: { $in: [req.body.idOther] },
            })

            if (!statusNotifi) {
                return res.status(400).json('notification: Ban chua like bai viet nay...')
            }
            await statusNotifi.updateOne({
                $pull: { idOther: req.body.idOther },
                count: statusNotifi.count - 1,
            })

            return res.status(200).json('notification: Da xoa')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    comment: async (req, res) => {
        try {
            const status = await Status.findById(req.body.idStatus)
            if (status.user == req.body.idOther) {
                return res.status(200).json('Status cua ban...')
            }
            const statusNotifi = await Notification.findOne({ idStatus: req.body.idStatus, action: 2 })
            if (!statusNotifi) {
                const commentNotifi = new Notification({
                    idUser: req.body.idUser,
                    idOther: req.body.idOther,
                    idStatus: req.body.idStatus,
                    action: 2,
                })
                await commentNotifi.save()
                return res.status(200).json('notification: comment')
            }
            await statusNotifi.updateOne({
                $push: { idOther: req.body.idOther },
                count: statusNotifi.count + 1,
            })
            return res.status(200).json('notification: comment')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    unComment: async (req, res) => {
        try {
            const status = await Status.findById(req.body.idStatus)
            if (status.user == req.body.idOther) {
                return res.status(200).json('Status cua ban...')
            }
            const statusNotifi = await Notification.findOne({ idStatus: req.body.idStatus, action: 2 })
            // await status.updateOne({
            //     $pull: { idOther: { $elemMatch: { $eq: req.body.idOther } } },
            //     count: status.count - 1,
            // })
            if (statusNotifi) {
                const array = statusNotifi.idOther
                const lastIndex = array.indexOf(req.body.idOther)

                if (lastIndex !== -1) {
                    array.splice(lastIndex, 1)
                    await statusNotifi.updateOne({ $set: { idOther: array }, count: statusNotifi.count - 1 })
                }
            }
            return res.status(200).json('notification: Da xoa')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    share: async (req, res) => {
        try {
            const status = await Status.findById(req.body.idStatus)
            if (status.user == req.body.idOther) {
                return res.status(200).json('Status cua ban...')
            }
            const statusNotifi = await Notification.findOne({ idStatus: req.body.idStatus, action: 3 })
            if (!statusNotifi) {
                const shareNotifi = new Notification({
                    idUser: req.body.idUser,
                    idOther: req.body.idOther,
                    idStatus: req.body.idStatus,
                    action: 3,
                })
                await shareNotifi.save()
                return res.status(200).json('notification: share')
            }
            await statusNotifi.updateOne({
                $push: { idOther: req.body.idOther },
                count: statusNotifi.count + 1,
            })
            return res.status(200).json('notification: share')
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    unShare: async (req, res) => {
        try {
            const status = await Status.findById(req.body.idStatus)
            if (status.user == req.body.idOther) {
                return res.status(200).json('Status cua ban...')
            }
            const statusNotifi = await Notification.findOne({ idStatus: req.body.idStatus, action: 3 })
            await statusNotifi.updateOne({
                $pull: { idOther: req.body.idOther },
                count: statusNotifi.count - 1,
            })
            return res.status(200).json('notification: Da xoa')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = notificationController
