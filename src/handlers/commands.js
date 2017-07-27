module.exports = {
    source: function(message) {
        message.channel.send('HELP A BROTHA OUT: https://github.com/snta/tpp-bot')
    },
    ping: function(message) {
        message.channel.send('pong')
    },
    help: function(message) {
        message.channel.send('commands: $help, $ping, $source')
    }
}
