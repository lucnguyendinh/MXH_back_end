const { Lixi } = require('../models')
const lixiController = {
    lixi: async (req, res) => {
        try {
            const newLixi = new Lixi({
                name: req.body.name,
                price: req.body.price,
                text: req.body.text,
            })
            await newLixi.save()
            return res.status(200).json('Lixi success !!!')
        } catch (err) {
            return res.status(500).json(err)
        }
        
    },
    getLixi: async (req, res) => {
        try {
            const lixis = await Lixi.find().sort({ createdAt: -1 })
            return res.status(200).json(lixis)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = lixiController
