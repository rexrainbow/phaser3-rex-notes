import BracketParser from '../../../bracketparser.js';

class BBCodeLog {
    constructor() {

        this.lines = [];
        this.styles = [];

        this.parser = (new BracketParser({
            delimiters: '[]'
        }))
            .on('+color', function (color) {
                this.lines.push('%c');
                this.styles.push(`color: ${color};`);
            }, this)
            .on('-color', function () {
                this.lines.push('%c');
                this.styles.push(`color: inherit;`);
            }, this)
            .on('content', function (content) {
                this.lines.push(content);
            }, this)
    }

    log(s, logType = 'log') {
        this.parser.start(s);

        console[logType].apply(console, [this.lines.join(''), ...this.styles]);

        this.lines.length = 0;
        this.styles.length = 0;

        return this;
    }
}

export default BBCodeLog;