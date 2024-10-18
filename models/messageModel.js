const { model, Schema } = require("mongoose")

const messageSchema = Schema({
    sender_name: {
        type: Schema.Types.ObjectId,
        required: [true, "user name is required"],
        ref: "user"
    },
    receiver_name: {
        type: Schema.Types.ObjectId,
        required: [true, "user mobile is required"],
        ref: "user"
    },
    message: {
        type: String,
        required: [true, "user name is required"],
    },
    Attechment: {
        type: String,
        default: ""
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isReadded: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const messageModel = model("message", messageSchema)

module.exports = messageModel;