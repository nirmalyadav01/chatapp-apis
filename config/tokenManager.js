const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config()
const expireTime = process.env.TOKEN_EXPIRE_TIME
const secret = process.env.TOKEN_SECREAT
class JWT {

    generatToken(user) {
        const token = jwt.sign({ id: user._id, mobile: user.mobile_number }, secret, { expiresIn: expireTime })
        return token
    }

    verifyToken(req) {
        return new Promise((resolve, reject) => {
            let Headers = req && req.headers
            let token = Headers && Headers.authorization?.split(" ")[1]
            if (!token) {
                resolve({ status: false, msg: "Token Not found!" })
            }
            jwt.verify(token, secret, async function (err, data) {
                if (err) {
                    resolve({ status: false, msg: "invalid or expire Token !" })
                }
                if (data) {
                    let user = await userModel.findOne({ _id: data.id })
                    if (user) {
                        req.user = data
                        resolve({ status: true })
                    }
                }
            })
        })
    }

}

module.exports = new JWT;