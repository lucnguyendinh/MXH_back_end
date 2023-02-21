const mongoose = require('mongoose')

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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Like',
                default: [],
            },
        ],
        share: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Share',
                default: [],
            },
        ],
        comment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserInfo',
            require: true,
        },
    },
    {
        timestamps: true,
    },
)

const shareSchema = new mongoose.Schema({
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',
    },
})

const commentSchema = new mongoose.Schema(
    {
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            require: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserInfo',
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

let UsersInfo = mongoose.model('Userinfo', usersInfoSchema)
let User = mongoose.model('User', userSchema)
let Status = mongoose.model('Status', statusSchema)
let Share = mongoose.model('Share', shareSchema)
let Like = mongoose.model('Like', likeSchema)
let Comment = mongoose.model('Comment', commentSchema)

module.exports = { UsersInfo, User, Status, Share, Like, Comment }
