var parseCommand = require('./parseCommand')
var commands = require('./commands')
var rateLimiter = require('./rateLimiter')

function MessageHandler(client, channels) {
    this.client = client
    this.channels = new Set(channels)
}

MessageHandler.prototype.client = function() {
    return this.client
}

MessageHandler.prototype.handle = function(message) {
    if (!this.channels.has(message.channel.id)) {
        return
    }

    commandObject = parseCommand(message.content)

    if (commandObject != null) {
        if (!rateLimiter.check(message.author)) {
            message.reply("You're not allowed to do that yet! Please wait a few seconds and try again.")
            return
        }
        handler = commands[commandObject.directive]
        if (handler !== undefined) {
            commandObject.message = message
            commandObject.user = message.author
            handler(commandObject)
        }
    }
}

module.exports = MessageHandler
