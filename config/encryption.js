require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUND);

class Bcrypt {
    PasswordHash(password) {
        return new Promise((resolve) => {
            let hash = bcrypt.hash(password, saltRounds)
            resolve(hash)
        })
    }

    VerifyPassword(password, hashPassword) {
        return new Promise(async (resolve) => {
            let match = await bcrypt.compare(password, hashPassword)
            resolve(match)
        })
    }
}

module.exports = new Bcrypt;