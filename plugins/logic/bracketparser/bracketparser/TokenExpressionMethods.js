import EscapeRegex from '../../../utils/string/EscapeRegex.js';

var GetDefaultTokenExpression = function (delimiterLeft, delimiterRight) {
    return `[^=${EscapeRegex(delimiterLeft)}${EscapeRegex(delimiterRight)}]+`;
}

export default {
    setTagExpression(express) {
        this.isDefaultTagExpression = (!express);
        this.tagExpression = express;
        return this;
    },

    setValueExpression(express) {
        this.isDefaultValueExpression = (!express);
        this.valueExpression = express;
        return this;
    },

    setDelimiters(delimiterLeft, delimiterRight) {
        if (delimiterRight === undefined) {
            delimiterRight = delimiterLeft[1];
            delimiterLeft = delimiterLeft[0];
        }
        this.delimiterLeft = delimiterLeft;
        this.delimiterRight = delimiterRight;

        if (this.isDefaultTagExpression) {
            this.tagExpression = GetDefaultTokenExpression(delimiterLeft, delimiterRight);
        }

        if (this.isDefaultValueExpression) {
            this.valueExpression = GetDefaultTokenExpression(delimiterLeft, delimiterRight);
        }

        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);

        var tag = `(${this.tagExpression})(=(${this.valueExpression}))?`;
        this.reTag = RegExp(tag, 'i');

        this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, 'gi');

        return this;
    },
}