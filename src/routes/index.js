const authRouter = require('./auth')
const statusRouter = require('./status')
const messageRouter = require('./message')
const profileRouter = require('./profile')
const notificationRouter = require('./notification')

const route = (app) => {
    app.use('/auth', authRouter)
    app.use('/status', statusRouter)
    app.use('/message', messageRouter)
    app.use('/profile', profileRouter)
    app.use('/notification', notificationRouter)
}

module.exports = route
