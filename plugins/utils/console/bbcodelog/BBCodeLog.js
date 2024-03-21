import Parser from './parser/Parser';

class BBCodeLog {
    constructor({
        delimiters = '[]',
        enable = true
    } = {}) {

        this.parser = new Parser({
            delimiters: delimiters
        });

        this.enable = enable;
    }

    setEnable(enable = true) {
        this.enable = enable;
        return this;
    }

    log(s, logType = 'log') {
        if (!this.enable) {
            return this;
        }

        if (typeof (s) == 'string') {
            var inputs = [];
            var modifiers = [];
            this.parser.parse(s).forEach(function (item) {
                inputs.push(`%c${item.value}`);
                modifiers.push(item.css);
            })

            console[logType].call(console, inputs.join(''), ...modifiers);

        } else {
            console[logType](s);

        }

        return this;
    }
}

export default BBCodeLog;