const authRouter = require('./auth')
const statusRouter = require('./status')

const route = (app) => {
    app.use('/auth', authRouter)
    app.use('/status', statusRouter)
}

module.exports = route
