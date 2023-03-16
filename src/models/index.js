const mongoose = require('mongoose')

//User
const usersInfoSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        sex: {
            type: String,
            required: true,
        },
        favorites: {
            type: String,
            required: true,
        },
        otherOf: {
            type: String,
            required: true,
        },
        avatarUrl: {
            type: String,
        },
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
        },
    },

    {
        timestamps: true,
    },
)

const userSchema = new mongoose.Schema(
    {
        sdt: {
            type: String,
            required: true,
            minlength: 9,
            maxlength: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 20,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        admin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)

//Status
const statusSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Userinfo',
            require: true,
        },
        content: {
            type: String,
        },
        img: {
            type: String,
        },
        shareW: {
            type: Number,
        },
        like: [
            {
                type: String,
                default: [],
            },
        ],
        share: [
            {
                type: String,
                default: [],
            },
        ],
        comment: [
            {
                type: String,
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    },
)

const likeSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Userinfo',
            require: true,
        },
    },
    {
        timestamps: true,
    },
)

const shareSchema = new mongoose.Schema({
    status: {
        type: String,
        require: true,
    },
    user: {
        type: String,
    },
})

const commentSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Userinfo',
            require: true,
        },
        content: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

//mess
const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
)

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
})

//Token
const tokenSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
    },
    refreshTokens: [
        {
            type: String,
            default: [],
        },
    ],
})

let UsersInfo = mongoose.model('Userinfo', usersInfoSchema)
let User = mongoose.model('User', userSchema)
let Status = mongoose.model('Status', statusSchema)
let Share = mongoose.model('Share', shareSchema)
let Like = mongoose.model('Like', likeSchema)
let Comment = mongoose.model('Comment', commentSchema)
let ConverSation = mongoose.model('ConverSation', conversationSchema)
let Message = mongoose.model('Message', messageSchema)
let Token = mongoose.model('Token', tokenSchema)

module.exports = { UsersInfo, User, Status, Share, Like, Comment, ConverSation, Message, Token }
