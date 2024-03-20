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
        var result = this.parser.parse(s);
        console[logType].apply(console, result);
        return this;
    }
}

export default BBCodeLog;