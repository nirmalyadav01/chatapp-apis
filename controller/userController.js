const userModel = require("../models/userModel")
const ApiResponse = require("../responseStructure")
const JWT = require('../config/tokenManager')
const Bcrypt = require("../config/encryption")
const Transporter = require("../config/sendMail")
require('dotenv').config()
const PORT = process.env.PORT

async function userSignUp(req, res) {
    const { name, mobile_number, gender, password, email } = req.body
    try {
        let hashPass = await Bcrypt.PasswordHash(password)
        let user = await userModel.create({ name, email, mobile_number, gender, password: hashPass })
        if (!user) {
            return res.json(new ApiResponse(false, null, "user sign up  failed !"));
        }
        if (user) {
          let info =  await Transporter.sendMail({
                from: `<${process.env.ADMIN_EMAIL}>`,
                to: user.email,
                subject: "Wellcome Message", // Subject line
                html: `<p>Wellcome ${user.name}  to Chat Messanger Thankyou for choosing Us <a href="http://localhost:9000">Click Here..</a></p>`, // plain text body
            })
            res.json(new ApiResponse(true, user, `user sign up success ! ${info.messageId}`));
        }
    } catch (error) {
        res.json(new ApiResponse(false, error.message, "internal server error !"))
    }
}

async function userSignIn(req, res) {
    const { mobile_number, password } = req.body
    try {
        const user = await userModel.findOne({ mobile_number })
        if (user) {
            let match = await Bcrypt.VerifyPassword(password, user.password)
            if (match) {
                const token = JWT.generatToken(user)
                let obj = user.toObject()
                obj.token = token
                delete obj.password
                res.json(new ApiResponse(true, obj, "sign success"))
            } else {
                res.json(new ApiResponse(false, null, "Incorrect Password"))
            }
        } else {
            res.json(new ApiResponse(false, null, "No User Found!"))
        }
    } catch (error) {
        res.json(new ApiResponse(false, error.message, "No User Found!"))
    }
}

async function getAllUsers(req, res) {
    try {
        let users = await userModel.find()
        if (!users) {
            return res.json(new ApiResponse(false, null, "No User Found!"))
        }
        let arr = [...users]
        let filter = arr.filter(item => item.mobile_number !== req.user.mobile)
        res.json(new ApiResponse(true, filter, "success"))
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }
}

// update user controller
async function editUser(req, res) {
    const { name, bio_info, DoB } = req.body
    try {
        let users = await userModel.findByIdAndUpdate(req.user.id, { name, bio_info, DoB }, { new: true })
        if (!users) {
            return res.json(new ApiResponse(false, null, "No User Found!"))
        }
        res.json(new ApiResponse(true, users, "success"))
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }
}

// update user controller
async function uploadUserPhoto(req, res) {
    const file = req.file;
    console.log(file);

    const url = `${req.protocol}://${req.hostname}:${PORT}`
    try {
        if (file.Error) {
            return res.json(new ApiResponse(false, null, file.msg))
        }
        let users = await userModel.findByIdAndUpdate(req.user.id, { profile: `${url}/${file.destination}${file.filename}` }, { new: true })
        if (!users) {
            return res.json(new ApiResponse(false, null, "No User Found!"))
        }
        res.json(new ApiResponse(true, users, "success"))
    } catch (error) {
        res.json(new ApiResponse(false, null, error.message))
    }
}

module.exports = {
    userSignUp,
    userSignIn,
    getAllUsers,
    editUser,
    uploadUserPhoto
}