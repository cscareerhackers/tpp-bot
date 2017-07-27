var db = require('../utils/db')
var LeetcodeSolution = require('../models/leetcodeSolution')

module.exports = {
    source: function(command) {
        command.message.channel.send('HELP A BROTHA OUT: https://github.com/snta/tpp-bot')
    },
    ping: function(command) {
        command.message.channel.send('pong')
    },
    add: function(command) {
        var solution = new LeetcodeSolution(command.arg(0), command.arg(1))
        command.db.addLeetcode(solution)
    }, 
    search: function(command) {
        command.db.searchLeetcode(parseInt(command.arg(0)))
    },
    help: function(command) {
        command.message.channel.send('commands: $help, $ping, $source')
    }
}
