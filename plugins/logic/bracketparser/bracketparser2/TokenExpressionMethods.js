import EscapeRegex from '../../../utils/string/EscapeRegex.js';
import ParseValue from './ParseValue.js';

var CreateQuotesExpression = function (leftQuote, rightQuote) {
    if (rightQuote === undefined) {
        rightQuote = leftQuote;
    }
    leftQuote = EscapeRegex(leftQuote);
    rightQuote = EscapeRegex(rightQuote);
    return `${leftQuote}[^${leftQuote}${rightQuote}]+${rightQuote}`
}

export default {
    setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;

        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);

        var varName = `[^ =\n]+`;  // Any character except space ,'=', and '\n'
        var varStringValue = `${CreateQuotesExpression('"')}|${CreateQuotesExpression("'")}`;
        var varArrayValue = CreateQuotesExpression('[', ']');
        var varDictionaryValue = CreateQuotesExpression('{', '}');
        var varValue = `${varStringValue}|${varArrayValue}|${varDictionaryValue}|${varName}`;  // Any character except '='
        var escapeSpace = `[ \n]*`;

        this.reCmdName = RegExp(`${escapeSpace}(${varName})${escapeSpace}`, 'i');
        this.reValuePair = RegExp(`(${varName})${escapeSpace}=${escapeSpace}(${varValue})${escapeSpace}`, 'gi');

        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, 'gs');
        return this;
    },

    parseTag(tagContent) {
        var regexResult = tagContent.match(this.reCmdName);
        var name = regexResult[1];
        tagContent = tagContent.substring(regexResult[0].length, tagContent.length);

        var payload = {};
        while (true) {
            var regexResult = this.reValuePair.exec(tagContent);
            if (!regexResult) {
                break;
            }
            payload[regexResult[1]] = ParseValue(regexResult[2], this.valueConverter);
        }

        return {
            name: name,
            payload: payload,
        };
    }
}