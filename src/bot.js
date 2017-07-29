var Discord = require('discord.js')
var mongoose = require('mongoose')

var props = require('./utils/props')
var MessageHandler = require('./handlers/messageHandler')

var client = new Discord.Client()
var messageLogic;

client.on('ready', function() {
    messageLogic = new MessageHandler(client, props.channels)
})

client.on('message', function(message) {
    messageLogic.handle(message);
})

mongoose.connect(props.dbUri)
client.login(props.token)

if (props.debug) {
    const repl = require('repl')
    repl.start('> ').context.client = client
}
