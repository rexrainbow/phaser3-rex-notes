import Parser from './parser/Parser';

class BBCodeLog {
    constructor() {
        this.parser = new Parser();
    }

    log(s, logType = 'log') {
        var result = this.parser.parse(s);
        console[logType].apply(console, result);
        return this;
    }
}

export default BBCodeLog;