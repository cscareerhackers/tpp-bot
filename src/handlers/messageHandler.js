var Discord = require('discord.js')
var db = require('../utils/db')
var parseCommand = require('./parseCommand')

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
        console.log(`Received message: channel=${message.channel.name} user=${message.author.username} text=${message.content}`)
        console.log('Command object:')
        console.log(commandObject)
    }
}

module.exports = MessageHandler
