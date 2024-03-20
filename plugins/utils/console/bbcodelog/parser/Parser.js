import BracketParser from '../../../../bracketparser.js';
import ParseHandlers from './ParseHandlers.js';

class Parser extends BracketParser {
    constructor() {
        super({
            delimiters: '[]'
        });

        this.lines = [];
        this.styles = [];

        for (var i = 0, cnt = ParseHandlers.length; i < cnt; i++) {
            ParseHandlers[i](this);
        }
    }

    clearBuffers() {
        this.lines.length = 0;
        this.styles.length = 0;
        return this;
    }

    addStyle(style) {
        this.lines.push('%c');
        this.styles.push(style);
        return this;
    }

    addContent(content) {
        this.lines.push(content);
        return this;
    }

    parse(s) {
        this.start(s);

        var result = [this.lines.join(''), ...this.styles];

        this.clearBuffers();

        return result;
    }
}

export default Parser;