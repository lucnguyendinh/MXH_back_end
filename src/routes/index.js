const authRouter = require('./auth')
const statusRouter = require('./status')
const messageRouter = require('./message')

const route = (app) => {
    app.use('/auth', authRouter)
    app.use('/status', statusRouter)
    app.use('/message', messageRouter)
}

module.exports = route
