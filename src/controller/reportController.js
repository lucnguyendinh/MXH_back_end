const { Status, Report } = require('../models')

const reportController = {
    reportStatus: async (req, res) => {
        try {
            const newReport = new Report({
                option: req.body.option,
                idRp: req.body.idRp,
                idU: req.body.idU,
            })
            await newReport.save()
            return res.status(200).json('Report success !!!')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getReport: async (req, res) => {
        try {
            const report = await Report.find()
                .populate({
                    path: 'idU',
                    select: 'avtImg fullName _id',
                })
                .sort({ createdAt: -1 })
            return res.status(200).json(report)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}

module.exports = reportController
