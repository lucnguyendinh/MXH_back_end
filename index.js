const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const db = require('./src/config/db')
const route = require('./src/routes')

const app = express()

dotenv.config()

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
