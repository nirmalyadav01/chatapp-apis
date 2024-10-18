const { model, Schema } = require("mongoose")

const friendSchema = Schema({
    sender_name: { //myyid // bhanu id
        type: Schema.Types.ObjectId,
        required: [true, "sender name is required"],
        ref : "user"
    },
    receiver_name: { // bhanu id // myid
        type: Schema.Types.ObjectId,
        required: [true, "receiver name is required"],
        ref : "user"
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const friendModel = model("friend", friendSchema)

module.exports = friendModel;