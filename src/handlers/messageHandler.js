var controllers = require('./controllers')
var parseCommand = require('./parseCommand')
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
        var controller = commandObject.controller
        var directive = commandObject.directive
        handler = controller[directive] !== undefined ? controller[directive] : controller['help']

        if (handler !== undefined) {
            commandObject.message = message
            commandObject.user = message.author
            handler(commandObject)
        } else {
            message.reply("Sorry, I didn't understand that!")
        }
    }
}

module.exports = MessageHandler
