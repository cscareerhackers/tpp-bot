var db = require('../utils/db')
var props = require('../utils/props')
var LeetcodeSolution = require('../models/leetcodeSolution')

var authorizedUsers = new Set(props.authorizedUsers)

function isAuthorized(user) {
    return authorizedUsers.has(user.id)
}

module.exports = {
    source: function(command) {
        command.message.reply('HELP A BROTHA OUT: https://github.com/snta/tpp-bot')
    },
    ping: function(command) {
        command.message.reply('pong')
    },
    add: function(command) {
        if (isAuthorized(command.user)) {
            var solution = new LeetcodeSolution({
                problemNumber: parseInt(command.arg(0)),
                link: command.arg(1),
                submitter: command.user.name
            })
            command.db.addLeetcode(solution)
            command.message.reply("Added a new solution for Leetcode #" + command.arg(0))
        } else {
            command.message.reply("You can't do that.")
        }
    },
    search: function(command) {
        command.db.searchLeetcode(parseInt(command.arg(0)), function(item) {
            command.message.reply(`Solution by ${item.submitter}: ${item.link}`)
        })
    },
}
