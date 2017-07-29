var controllers = require('./controllers')

class CommandObject {
    constructor(controller, directive, args) {
        this.controller = controller
        this.directive = directive
        this.args = args
    }

    arg(index) {
        if (index > this.args.length) {
            return ''
        }
        return this.args[index]
    }
}

function parse(text) {
    if (!text.startsWith('!')) {
        return null
    }

    splitted = text.split(' ')
    commandType = splitted[0].toLowerCase().replace('!', '')
    var controller = controllers[commandType] !== undefined ? controllers[commandType] : controllers.general
    var directive, args
    if (controller.isGeneral) {
        directive = splitted[0]
        args = splitted.slice(1) || []
    } else {
        directive = splitted[1]
        args = splitted.slice(2) || []
    }
    return new CommandObject(controller, directive, args)
}

module.exports = parse
