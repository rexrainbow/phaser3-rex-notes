import BracketParser from '../../../../bracketparser.js';
import ParseHandlers from './ParseHandlers.js';

class Parser extends BracketParser {
    constructor() {
        super({
            delimiters: '[]'
        });

        this.segments = [];
        this.lastSegment = {};

        for (var i = 0, cnt = ParseHandlers.length; i < cnt; i++) {
            ParseHandlers[i](this);
        }
    }

    clearBuffers() {
        this.segments.length = 0;
        this.lastSegment = {};
        return this;
    }

    addStyle(name, value) {
        this.lastSegment[name] = value;
        return this;
    }

    removeStyle(name) {
        this.lastSegment[name] = null;
        return this;
    }

    addContent(content) {
        this.lastSegment.text = content;
        this.segments.push(this.lastSegment);
        this.lastSegment = {};
        return this;
    }

    parse(s) {
        this.start(s);

        var content = [];
        var styles = [];

        for (var i = 0, cnt = this.segments.length; i < cnt; i++) {
            var segment = this.segments[i];
            var text = segment.text;
            if (!text) {
                continue;
            }
            delete segment.text;
            var style = [];
            for (var propName in segment) {
                var propValue = segment[propName];
                if (propValue === null) {
                    propValue = 'inherit';
                }
                style.push(`${propName}:${propValue}`)
            }

            content.push(`%c${text}`);
            styles.push(style.join(';'));
        }

        var result = [content.join(''), ...styles];

        this.clearBuffers();

        return result;
    }
}

export default Parser;