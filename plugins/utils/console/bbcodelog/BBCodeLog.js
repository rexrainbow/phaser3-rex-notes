import Parser from './parser/Parser';

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
            var value = item.value;
            if ((typeof (value) === 'object') ||
                (typeof (value) === 'function')) {
                inputs.push('%o');
                modifiers.push(value);

            } else {  // string
                if (item.css) {
                    inputs.push('%c' + value);
                    modifiers.push(item.css);
                } else { // No css
                    inputs.push(value);
                }

            }
        })

        console[logType].call(console, inputs.join(''), ...modifiers);
        return this;
    }
}

export default BBCodeLog;