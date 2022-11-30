import BracketParserBase from '../bracketparserbase/BracketParser.js';
import EscapeRegex from '../../../utils/string/EscapeRegex.js';
import ParseValue from './ParseValue.js';


class BracketParser extends BracketParserBase {
    setDelimiters(delimiterLeft, delimiterRight) {
        super.setDelimiters(delimiterLeft, delimiterRight);

        delimiterLeft = EscapeRegex(this.delimiterLeft);
        delimiterRight = EscapeRegex(this.delimiterRight);

        this.reTagName = RegExp(reTagName, 'i');
        this.reParamPair = RegExp(reParamPair, 'gi');

        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, 'gs');
        return this;
    }

    onTag(tagContent) {
        var regexResult = tagContent.match(this.reTagName);
        var tagName = regexResult[1];

        this.reParamPair.lastIndex = regexResult.index + regexResult[0].length;
        var payload = {};
        while (true) {
            var regexResult = this.reParamPair.exec(tagContent);
            if (!regexResult) {
                break;
            }
            payload[regexResult[1]] = ParseValue(regexResult[2], this.valueConverter);
        }

        var isCloseTag = (tagName.charAt(0) === '/');
        if (isCloseTag) {
            tagName = tagName.substring(1, tagName.length);
        }

        var eventPrefix = (isCloseTag) ? '-' : '+';
        this.skipEventFlag = false;
        this.emit(`${eventPrefix}${tagName}`, payload);
        if (!this.skipEventFlag) {
            this.emit(eventPrefix, tagName, payload);
        }

        if (!isCloseTag) {
            this.lastTagStart = tagName;
        } else {
            this.lastTagEnd = tagName;
        }
    }
}

var CreateQuotesExpression = function (leftQuote, rightQuote) {
    if (rightQuote === undefined) {
        rightQuote = leftQuote;
    }
    leftQuote = EscapeRegex(leftQuote);
    rightQuote = EscapeRegex(rightQuote);
    return `${leftQuote}[^${leftQuote}${rightQuote}]+${rightQuote}`
}

const varName = `[^ =\n]+`;  // Any character except space ,'=', and '\n'
const varStringValue = `${CreateQuotesExpression('"')}|${CreateQuotesExpression("'")}`;
const varArrayValue = CreateQuotesExpression('[', ']');
const varDictionaryValue = CreateQuotesExpression('{', '}');
const varValue = `${varStringValue}|${varArrayValue}|${varDictionaryValue}|${varName}`;  // Any character except '='
const escapeSpace = `[ \n]*`;
const reTagName = `${escapeSpace}(${varName})${escapeSpace}`;
const reParamPair = `(${varName})${escapeSpace}=${escapeSpace}(${varValue})${escapeSpace}`

export default BracketParser;