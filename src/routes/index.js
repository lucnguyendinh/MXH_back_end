const authRouter = require('./auth')
const statusRouter = require('./status')
const messageRouter = require('./message')
const profileController = require('./profile')

const route = (app) => {
    app.use('/auth', authRouter)
    app.use('/status', statusRouter)
    app.use('/message', messageRouter)
    app.use('/profile', profileController)
}

module.exports = route
