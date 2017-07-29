var props = require('../utils/props')
var LeetcodeSolution = require('../models/leetcodeSolution')
var leetcode = require('../utils/leetcode')

var authorizedUsers = new Set(props.authorizedUsers)

function isAuthorized(user) {
    return authorizedUsers.has(user.id)
}

module.exports = {
    source: function(command) {
        command.message.reply('Please issue a PR if you can contribute! https://github.com/snta/tpp-bot')
    },
    ping: function(command) {
        command.message.reply('pong')
    },
    add: function(command) {
        if (isAuthorized(command.user)) {
            var solution = new LeetcodeSolution({
                problemNumber: parseInt(command.arg(0)),
                link: command.arg(1),
                submitter: command.user.id
            })
            solution.save(function (err) {
                if (err) {
                    command.message.channel.send("Error indexing solution. Please resubmit later.")
                } else {
                    command.message.channel.send("Added a new solution for Leetcode #" + command.arg(0))
                }
            })
        } else {
            command.message.reply("You can't do that.")
        }
    },
    search: function(command) {
        LeetcodeSolution.find({ problemNumber: parseInt(command.arg(0))}, (err, result) => {
            result.forEach((res) => {
                command.message.channel.send(`Solution for #${parseInt(command.arg(0))}, submitted by <@${res.submitter}>: ${res.link}`)
                if (isAuthorized(command.user)) {
                    command.message.reply(`ID: ${res._id}`)
                }
            })
        })
    },
    delete: function(command) {
        LeetcodeSolution.find({ _id: command.arg(0)}).remove()
    },
    daily: function(command) {
        command.message.reply(leetcode.dailyMessage())
    }
}
