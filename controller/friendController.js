const ApiResponse = require("../responseStructure");
const friendModel = require("../models/freindsModel")

async function sendRequest(req, res) {
    const { reciverid } = req.params;
    try {
        const already = await friendModel.findOne({ receiver_name: reciverid, sender_name: req.user.id })
        if (already) {
            return res.json(new ApiResponse(false, null, "already send Request"))
        }
        const request = await friendModel.create({ receiver_name: reciverid, sender_name: req.user.id })
        if (request) {
            res.json(new ApiResponse(true, request, "friend request send"))
        } else {
            res.json(new ApiResponse(false, null, "not send friend request"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}


async function recivedRequest(req, res) {

    try {
        const recived = await friendModel.find({ receiver_name: req.user.id, isAccepted: false }).populate("sender_name")
        if (recived.length > 0) {
            res.json(new ApiResponse(true, recived, "panding friend requests"))
        } else {
            res.json(new ApiResponse(true, null, "no friend requests"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}

async function acceptRequest(req, res) {
    const { requestid } = req.params;
    try {

        const recived = await friendModel.findByIdAndUpdate(requestid, { isAccepted: true }, { new: true }).populate("sender_name")
        if (recived) {

            res.json(new ApiResponse(true, recived, "friend requests accepted"))
        } else {
            res.json(new ApiResponse(true, null, "friend requests Error"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}

async function deleteRequest(req, res) {

    const { requestid } = req.params;
    try {
        const request = await friendModel.findById(requestid)
        if (request && request.isAccepted) {
            return res.json(new ApiResponse(true, null, "you are friends, so you can not request"))
        }
        const recived = await friendModel.findByIdAndDelete(requestid).populate("sender_name")
        if (recived) {
            res.json(new ApiResponse(true, recived, "friend requests deleted"))
        } else {
            res.json(new ApiResponse(true, null, "friend requests Error"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}

async function TotalFriends(req, res) {

    try {
        const recived = await friendModel.find({ receiver_name: req.user.id, isAccepted: true }).populate("sender_name");
        const myFriends = await friendModel.find({ sender_name: req.user.id, isAccepted: true }).populate("receiver_name");
        if (recived || myFriends) {
            res.json(new ApiResponse(true, [...recived,...myFriends] , "total friends"))
        } else {
            res.json(new ApiResponse(true, null, "no friends"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }

}

module.exports = { sendRequest, recivedRequest, acceptRequest, deleteRequest, TotalFriends }