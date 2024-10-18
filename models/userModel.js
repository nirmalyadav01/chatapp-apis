const { model, Schema } = require("mongoose")

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "user name is required"]
    },
    mobile_number: {
        type: Number,
        required: [true, "user mobile is required"],
        unique: true
    },
    gender: {
        type: String,
        required: [true, "user name is required"],
    },
    DoB: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, "user Email is required"],
    },
    profile: {
        type: String,
        default: ""
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    bio_info: {
        type: String,
        default: ""
    },
    ac_privacy: {
        type: String,
        default: ""
    },
    is_show_profile: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: [true, "user name is required"]
    },
}, { timestamps: true })

const userModel = model("user", userSchema)

module.exports = userModel;