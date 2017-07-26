var Discord = require('discord.js')
var properties = require('properties')
var client = new Discord.Client()

var token = 'PLACEHOLDER'

properties.parse('props', { path: true }, function (err, obj) {
  if (err) return console.error(err)

  token = obj['discord_bot_token']
  client.login(token)
})  

client.on('ready', () => {
  console.log('READY!')
})

client.on('message', message => {
  if (message.content === 'tpp')
    message.channel.send('bot test')

})

