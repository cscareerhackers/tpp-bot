var Discord = require('discord.js')
var props = require('./utils/props')

var client = new Discord.Client()

client.on('message', function(message) {
   
})

client.login(props.token)

if (props.debug) {
    const repl = require('repl')
    repl.start('> ').context.client = client
}
