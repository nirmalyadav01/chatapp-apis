const ApiResponse = require("../responseStructure");
const messageModel = require("../models/messageModel")
const friendModel = require("../models/freindsModel");
const { getTimeNumber } = require("../utils");

async function sendMessage(req, res) {
    const { reciverid } = req.params;
    const { message } = req.body
    try {
        const already = await friendModel.findOne({ receiver_name: req.user.id, sender_name: reciverid, isAccepted: true })
        const already1 = await friendModel.findOne({ receiver_name: reciverid, sender_name: req.user.id, isAccepted: true })
        if (already && already1) {
            return res.json(new ApiResponse(false, null, "you are not friends"))
        }
        const request = await messageModel.create({ receiver_name: reciverid, sender_name: req.user.id, message })
        if (request) {
            let msg = await messageModel.findById(request._id).populate("receiver_name").populate("sender_name")
            res.json(new ApiResponse(true, msg, "message sent"))
        } else {
            res.json(new ApiResponse(false, null, "message not sent"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}


async function recivedMessage(req, res) {
    const { reciverid } = req.params;
    try {
        const reciverMessage = await messageModel.find({ receiver_name: req.user.id, sender_name: reciverid, }).populate("sender_name")
        const myMessage = await messageModel.find({ receiver_name: reciverid, sender_name: req.user.id }).populate("sender_name")
        if (reciverMessage || myMessage) {
            let arr = [...reciverMessage, ...myMessage]
            arr.sort((a, b) => getTimeNumber(a.createdAt) - getTimeNumber(b.createdAt))
            res.json(new ApiResponse(true, arr, "panding friend requests"))
        } else {
            res.json(new ApiResponse(true, [], "no friend requests"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}


async function deleteMessage(req, res) {

    const { requestid } = req.params;
    try {
        const request = await messageModel.findById(requestid)
        if (request && request.isAccepted) {
            return res.json(new ApiResponse(true, null, "you are friends, so you can not request"))
        }
        const recived = await messageModel.findByIdAndDelete(requestid).populate("sender_name")
        if (recived) {
            res.json(new ApiResponse(true, recived, "friend requests deleted"))
        } else {
            res.json(new ApiResponse(true, null, "friend requests Error"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}


module.exports = { recivedMessage, sendMessage, deleteMessage }