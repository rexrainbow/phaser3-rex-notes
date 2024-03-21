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
        if (s) {
            var inputs = [];
            var modifiers = [];
            this.parser.parse(s).forEach(function (item) {
                inputs.push(`%c${item.value}`);
                modifiers.push(item.css);
            })

            console[logType].call(console, inputs.join(''), ...modifiers);

        } else {
            console[logType]();

        }
        return this;
    }
}

export default BBCodeLog;