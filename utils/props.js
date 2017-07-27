var YAML = require('yamljs')

var props = YAML.load('props.yml')

module.exports = {
    token: props.bot.token,
    channels: props.channels,
    debug: props.debug
}
