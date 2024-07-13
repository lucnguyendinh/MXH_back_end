const nodemailer = require('nodemailer')

const sendMailController = {
    send: async (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: '',
            },
        })

        const images = []

        let mailOptions = {
            from: '',
            to: '',
            subject: '',
            html: ``,
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return res.status(500).json(error)
            } else {
                return res.status(200).json('Email sent: ' + info.response)
            }
        })
    },
}

module.exports = sendMailController
