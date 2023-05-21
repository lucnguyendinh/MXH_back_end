const { ConverSation, Message } = require('../models')

const messageController = {
    //[POST] converSation
    createConverSation: async (req, res) => {
        try {
            const newConverSation = new ConverSation({
                members: [req.body.senderId, req.body.receiverId],
            })
            const converSation = await newConverSation.save()
            return res.status(200).json(converSation)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    //[GET] get message
    getMessage: async (req, res) => {
        try {
            const message = await ConverSation.find({
                members: { $in: [req.params.userId] },
            })
            return res.status(200).json(message)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    //[POST] Mess
    mess: async (req, res) => {
        try {
            const newMessage = Message({
                conversationId: req.body.conversationId,
                sender: req.body.sender,
                text: req.body.text,
            })
            const message = await newMessage.save()
            return res.status(200).json(message)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    //[GET] Mess
    getMess: async (req, res) => {
        try {
            const message = await Message.find({ conversationId: req.params.conversationId })
            return res.status(200).json(message)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = messageController
