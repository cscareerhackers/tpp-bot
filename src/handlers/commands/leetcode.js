var props = require('../../utils/props')
var leetcode = require('../../utils/leetcode')
var LeetcodeSolution = require('../../models/leetcodeSolution')
var LeetcodeSubmission = require('../../models/leetcodeSubmission')

var authorizedUsers = new Set(props.authorizedUsers)

function isAuthorized(user) {
    return authorizedUsers.has(user.id)
}

module.exports = {
    help: function(command) {
        command.message.channel.send(`Available commands:
            !leetcode submit <problem> <solution> - Submits a solution for review.
            !leetcode search <problem> - Lists solutions and resources to a problem.
            !leetcode daily - Provides a link to today's daily question.`)
        if (isAuthorized(command.user)) {
            command.message.channel.send(`Additional commands:
                !leetcode add <problem> <solution> - Directly submits a solution to the database.
                !leetcode delete <id> - Deletes a command from the database. Does not affect submissions, only solutions.
                !leetcode approve <id> - Converts a pending submission into a solution.`)
        }
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
            command.message.reply("You're not allowed to do that.")
        }
    },
    submit: function(command) {
        var num = parseInt(command.arg(0))
        var submission = new LeetcodeSubmission({
            problemNumber: num,
            link: command.arg(1),
            submitter: command.user.id
        })

        submission.save(function (err) {
            if (err) {
                console.log(err)
                command.message.channel.send("Error indexing mission. Please resubmit later.")
            } else {
                command.message.reply("Done! Thank you for contributing.")
            }
        })
    },
    search: function(command) {
        LeetcodeSolution.find({ problemNumber: parseInt(command.arg(0))}, (err, result) => {
            if (result) {
                result.forEach((res) => {
                    command.message.channel.send(`Approved solution, submitted by <@${res.submitter}>: ${res.link}`)
                    if (isAuthorized(command.user)) {
                        command.message.reply(`ID: ${res._id}`)
                    }
                })
            }
        })

        LeetcodeSubmission.find({ problemNumber: parseInt(command.arg(0))}, (err, result) => {
            result.forEach((res) => {
                command.message.channel.send(`Pending approval, submitted by <@${res.submitter}>: ${res.link}`)
                if (isAuthorized(command.user)) {
                    command.message.reply(`ID: ${res._id}`)
                }
            })
        })
    },
    approve: function(command) {
        if (isAuthorized(command.user)) {
            LeetcodeSubmission.find({ _id: command.arg(0)}, (err, result) => {
                result.forEach((res) => {
                    var solution = new LeetcodeSolution({
                        problemNumber: res.problemNumber,
                        link: res.link,
                        submitter: res.submitter
                    }).save(function (err) {
                        if (err) {
                            command.message.channel.send("Error indexing solution. Please try later.")
                            console.log(err)
                        } else {
                            command.message.channel.send("Done.")
                        }
                    })
                })
            }).remove()
        }
    },
    delete: function(command) {
        LeetcodeSolution.findByIdAndRemove(command.arg(0), function(err, res) {
            if (err) {
                console.log(err)
            } else {
                command.message.channel.send(`Removed solution.`)
            }
        })
        LeetcodeSubmission.findByIdAndRemove(command.arg(0), function(err, res) {
            if (err) {
                console.log(err)
            } else {
                command.message.channel.send(`Removed submission.`)
            }
        })
    },
    daily: function(command) {
        command.message.reply(leetcode.dailyMessage())
    }
}
