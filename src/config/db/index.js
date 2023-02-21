const mongoose = require('mongoose')

const connect = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGOBD_URL)
        console.log('connect successfully!!!')
    } catch (error) {
        console.log('connect failure!!!')
    }
}

module.exports = { connect }
