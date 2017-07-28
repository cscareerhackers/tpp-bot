class CommandObject {
    constructor(directive, args) {
        this.directive = directive
        this.args = args
    }
    
    arg(index) {
        if (index > args.length) {
            return ''
        }
        return this.args[index]
    }   
}

function parse(text) {
    if (!text.startsWith('!leetcode')) {
        return null
    }
    
    splitted = text.split(' ').slice(1)
    directive = splitted[0]
    if (splitted.length == 1) { // single word
        return new CommandObject(directive, [])
    }
    args = splitted.slice(1)
    return new CommandObject(directive, args)
}

module.exports = parse
