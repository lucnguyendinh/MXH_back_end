const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const db = require('./config/db')
const route = require('./routes')

const app = express()

dotenv.config()

app.use(cors())
app.use(cookieParser())
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//CONNECT DB
db.connect()

//ROUTES
route(app)

app.listen(8000, () => {
    console.log('Server is running')
})
