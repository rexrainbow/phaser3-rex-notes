import Parser from './parser/Parser';

const RESET_INPUT = "%c ";
const RESET_CSS = "";

class BBCodeLog {
    constructor({
        delimiters = '[]'
    } = {}) {
        this.parser = new Parser({
            delimiters: delimiters
        });
    }

    log(s, logType = 'log') {
        var inputs = [];
        var modifiers = [];
        this.parser.parse(s).forEach(function (item) {
            if (item.css) {
                inputs.push(`%c${item.value}`);
                modifiers.push(item.css);
            } else { // No css
                inputs.push(item.value);
            }
        })

        console[logType].call(console, inputs.join(''), ...modifiers);
        return this;
    }
}

export default BBCodeLog;