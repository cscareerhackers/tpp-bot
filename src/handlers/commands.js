var db = require('../utils/db')
var props = require('../utils/props')
var LeetcodeSolution = require('../models/leetcodeSolution')

var authorizedUsers = new Set(props.authorizedUsers)

function isAuthorized(user) {
    return authorizedUsers.has(user.id)
}

module.exports = {
    source: function(command) {
        command.message.channel.send('HELP A BROTHA OUT: https://github.com/snta/tpp-bot')
    },
    ping: function(command) {
        command.message.channel.send('pong')
    },
    add: function(command) {
        if (isAuthorized(command.user)) {
            var solution = new LeetcodeSolution(command.arg(0), command.arg(1))
            command.db.addLeetcode(solution)
            command.message.channel.send("added")
        } else {
            command.message.channel.send("you can't add solutions!")
        }
    }, 
    search: function(command) {
        command.db.searchLeetcode(parseInt(command.arg(0)), function(item) {
            command.message.channel.send(`solution: ${item.link}`)
        })
    },
    help: function(command) {
        command.message.channel.send('commands: $help, $ping, $source')
    }
}
