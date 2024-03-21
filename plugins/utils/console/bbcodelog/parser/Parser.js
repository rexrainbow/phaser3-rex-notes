import BracketParser from '../../../../bracketparser.js';
import ParseHandlers from './ParseHandlers.js';
import Clone from '../../../object/Clone.js';

class Parser extends BracketParser {
    constructor(config) {
        super(config);

        this.segments = [];
        this.lastPropFlags = null;

        for (var i = 0, cnt = ParseHandlers.length; i < cnt; i++) {
            ParseHandlers[i](this);
        }
    }

    clearBuffers() {
        this.segments.length = 0;
        this.lastPropFlags = null;
        return this;
    }

    addStyle(name, value) {
        if (this.lastPropFlags === null) {
            this.lastPropFlags = {};
        }

        this.lastPropFlags[name] = value;
        return this;
    }

    removeStyle(name) {
        if (this.lastPropFlags === null) {
            return this;
        }

        this.lastPropFlags[name] = null;
        return this;
    }

    addContent(content) {
        if (this.lastPropFlags) {
            this.segments.push(Clone(this.lastPropFlags));
            this.segments.push(content);

            // Clear removed flags
            for (var name in this.lastPropFlags) {
                if (this.lastPropFlags[name] === null) {
                    delete this.lastPropFlags[name];
                }
            }

        } else {
            if (this.segments === 0) {
                this.segments.push(content);
            } else {
                this.segments[this.segments.length - 1] += content;
            }

        }

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
        var propValue = propFlags[propName];
        if (propValue === null) {
            propValue = 'inherit';
        }
        styles.push(`${propName}:${propValue}`)
    }

    return styles.join(';');
}

export default Parser;