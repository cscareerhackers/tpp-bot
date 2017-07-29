module.exports = {
    isGeneral: true,
    help: function(command) {
        command.message.channel.send(`Available commands:
            !leetcode <subcommand> -- Leetcode helpers. Do !leetcode help for more info.`)
    }
}
