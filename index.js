const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const db = require('./src/config/db')
const route = require('./src/routes')

const app = express()

dotenv.config()

// Cấu hình Cors để cho phép trang web cố định
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3000', 'https://mxh-front-end.vercel.app']
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}
app.use(cors())
app.use(bodyParser.json({ limit: '100mb' }))
app.use(
    bodyParser.urlencoded({
        // to support URL-encoded bodies
        limit: '100mb',
        extended: true,
    }),
)
app.use(cookieParser())

app.use(express.json())

//CONNECT DB
db.connect()

//ROUTES
route(app)

app.listen(8000, () => {
    console.log('Server is running')
})
