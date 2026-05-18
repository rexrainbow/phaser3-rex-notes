import BracketParser from '../../../../bracketparser';
import ParseHandlers from './ParseHandlers';
import Clone from '../../../object/Clone';

class Parser extends BracketParser {
    lastPropFlags: any;
    segments: any;
    start: any;

    constructor(config?: any) {
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

    addStyle(name?: any, value?: any) {
        this.lastPropFlags[name] = value;
        return this;
    }

    removeStyle(name?: any) {
        delete this.lastPropFlags[name];
        return this;
    }

    addContent(content?: any) {
        this.segments.push(Clone(this.lastPropFlags));
        this.segments.push(content);
        return this;
    }

    parse(s?: any) {
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

var PropToStyle = function(propFlags?: any) {
    var styles = [];
    for (var propName in propFlags) {
        styles.push(`${propName}:${propFlags[propName]}`)
    }

    return styles.join(';');
}

export default Parser;