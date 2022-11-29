import EscapeRegex from '../../../utils/string/EscapeRegex.js';

var GetDefaultValueExpression = function (delimiterLeft, delimiterRight) {
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
            this.tagExpression = GetDefaultValueExpression(delimiterLeft, delimiterRight);
        }

        if (this.isDefaultValueExpression) {
            this.valueExpression = GetDefaultValueExpression(delimiterLeft, delimiterRight);
        }

        delimiterLeft = EscapeRegex(delimiterLeft);
        delimiterRight = EscapeRegex(delimiterRight);

        var tagOn = `${delimiterLeft}(${this.tagExpression})(=(${this.valueExpression}))?${delimiterRight}`;
        var tagOff = `${delimiterLeft}\/(${this.tagExpression})${delimiterRight}`;

        this.reTagOn = RegExp(tagOn, 'i');
        this.reTagOff = RegExp(tagOff, 'i');
        this.reSplit = RegExp(`${tagOn}|${tagOff}`, 'gi');
        return this;
    },

    getTagOnRegString(tagExpression, valueExpression) {
        if (tagExpression === undefined) {
            tagExpression = this.tagExpression;
        }
        if (valueExpression === undefined) {
            valueExpression = this.valueExpression;
        }
        return `${EscapeRegex(this.delimiterLeft)}(${tagExpression})(=(${valueExpression}))?${EscapeRegex(this.delimiterRight)}`;
    },

    getTagOffRegString(tagExpression) {
        if (tagExpression === undefined) {
            tagExpression = this.tagExpression;
        }
        return `${EscapeRegex(this.delimiterLeft)}\/(${tagExpression})${EscapeRegex(this.delimiterRight)}`;
    }
}