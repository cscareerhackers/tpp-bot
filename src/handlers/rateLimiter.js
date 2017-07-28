var props = require('../utils/props')

var rates = {}

function check(user) {
    if (!(user.id in rates)) {
        rates[user.id] = Date.now()
        return true
    }
    var last = rates[user.id]
    var now = Date.now()

    if ((now - last) < props.cooldown) {
        return false
    }
    return true
}

module.exports = {
    check: check
}
