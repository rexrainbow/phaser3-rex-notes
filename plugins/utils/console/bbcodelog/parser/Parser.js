import BracketParser from '../../../../bracketparser.js';
import ParseHandlers from './ParseHandlers.js';
import Clone from '../../../object/Clone.js';

class Parser extends BracketParser {
    constructor(config) {
        super(config);

        this.segments = [];
        this.lastPropFlags = {};

        for (var i = 0, cnt = ParseHandlers.length; i < cnt; i++) {
            ParseHandlers[i](this);
        }
    }

    clearBuffers() {
        this.segments.length = 0;
        this.lastPropFlags = {};
        return this;
    }

    addStyle(name, value) {
        this.lastPropFlags[name] = value;
        return this;
    }

    removeStyle(name) {
        delete this.lastPropFlags[name];
        return this;
    }

    addContent(content) {
        this.segments.push(Clone(this.lastPropFlags));
        this.segments.push(content);
        return this;
    }

    parse(s) {
        this.start(s);

        var result = [];
        for (var i = 0, cnt = this.segments.length; i < cnt; i++) {
            var text = this.segments[i];
            if (typeof (text) !== 'string') {
                continue;
            }

            var propFlags = this.segments[i - 1];
            if (typeof (propFlags) === 'object') {
                result.push({
                    value: text,
                    css: PropToStyle(propFlags)
                })
            } else {
                result.push({
                    value: text,
                    css: null
                })
            }
        }

        this.clearBuffers();

        return result;
    }
}

var PropToStyle = function (propFlags) {
    var styles = [];
    for (var propName in propFlags) {
        styles.push(`${propName}:${propFlags[propName]}`)
    }

    return styles.join(';');
}

export default Parser;