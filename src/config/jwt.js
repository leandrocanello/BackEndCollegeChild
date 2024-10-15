const jwt = require("jsonwebtoken")
require("dotenv").config()

function sign(payload) {
    const token = jwt.sign(payload, process.env.PRIVATE, { algorithm: "RS256"})
    return token
}

async function verify (token) {
    const decoded = jwt.verify(token, process.env.CERT, { algorithms: ["RS256"] });
    return decoded
}

module.exports.sign = sign
module.exports.verify = verify
