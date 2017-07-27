var Discord = require('discord.js')
var db = require('../utils/db')
var parseCommand = require('./parseCommand')
var commands = require('./commands')

function MessageHandler(client, channels) {
    this.client = client
    this.channels = new Set(channels)
}

MessageHandler.prototype.client = function() {
    return this.client
}

MessageHandler.prototype.handle = function(message) {
    if (!(message.channel instanceof Discord.TextChannel)) {
        return
    }

    if (!this.channels.has(message.channel.id)) {
        return
    }
    
    commandObject = parseCommand(message.content)

    if (commandObject != null) {
        handler = commands[commandObject.directive]
        if (handler !== undefined) {
            commandObject.db = db
            commandObject.message = message
            handler(commandObject)
        }
    }
}

module.exports = MessageHandler
