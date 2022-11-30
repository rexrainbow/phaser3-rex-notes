import BracketParserBase from '../bracketparserbase/BracketParser.js';
import EscapeRegex from '../../../utils/string/EscapeRegex.js';
import GetValue from '../../../utils/object/GetValue.js';
import ParseValue from './ParseValue.js';

class BracketParser extends BracketParserBase {
    constructor(config) {
        super(config);

        // Parameters for regex
        this.setTagExpression(GetValue(config, 'regex.tag', undefined));
        this.setValueExpression(GetValue(config, 'regex.value', undefined));
        // Brackets and generate regex
        var delimiters = GetValue(config, 'delimiters', '<>');
        this.setDelimiters(delimiters[0], delimiters[1]);
    }

    setTagExpression(express) {
        this.useDefaultTagExpression = (!express);
        this.tagExpression = express;
        return this;
    }

    setValueExpression(express) {
        this.useDefaultValueExpression = (!express);
        this.valueExpression = express;
        return this;
    }

    setDelimiters(delimiterLeft, delimiterRight) {
        super.setDelimiters(delimiterLeft, delimiterRight);

        if (this.useDefaultTagExpression) {
            this.tagExpression = `[^=]+`;
        }

        if (this.useDefaultValueExpression) {
            this.valueExpression = `[^=]+`;
        }

        delimiterLeft = EscapeRegex(this.delimiterLeft);
        delimiterRight = EscapeRegex(this.delimiterRight);

        var tag = `(${this.tagExpression})(=(${this.valueExpression}))?`;
        this.reTag = RegExp(tag, 'i');

        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, 'gi');

        return this;
    }

    onTag(tagContent) {
        var regexResult = tagContent.match(this.reTag);

        var tagName = regexResult[1];

        var isCloseTag = (tagName.charAt(0) === '/');
        if (isCloseTag) {
            tagName = tagName.substring(1, tagName.length);
        }

        this.skipEventFlag = false;
        if (!isCloseTag) {
            var values = ParseValue(regexResult[3], this.valueConverter);
            this.emit(`+${tagName}`, ...values);
            if (!this.skipEventFlag) {
                this.emit('+', tagName, ...values);
            }
            this.lastTagStart = tagName;
        } else {
            this.emit(`-${tagName}`);
            if (!this.skipEventFlag) {
                this.emit('-', tagName);
            }
            this.lastTagEnd = tagName;
        }
    }
}

export default BracketParser;