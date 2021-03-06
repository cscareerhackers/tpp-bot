var YAML = require('yamljs')

var props = YAML.load('props.yml')

module.exports = {
    authorizedUsers: props.authorizedUsers,
    token: props.bot.token,
    channels: props.channels,
    dbUri: props.mongodb.uri,
    debug: props.debug,
    cooldown: props.commands.cooldown,
    disabledCommands: new Set(props.commands.disabled),
    leetcodeUrl: props.leetcode.url
}
