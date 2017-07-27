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
    if (!text.startsWith('$')) {
        return null
    }
    
    splitted = text.split(' ')
    if (splitted.length == 1) { // single word
        return new CommandObject(splitted[0], [])
    }        
    args = splitted.slice(1)
    return new CommandObject(splitted[0], args)
}

module.exports = parse
