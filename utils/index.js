function getTimeNumber(dt) {
    let date = new Date(dt)
    return date.getTime()
}

module.exports = {getTimeNumber}