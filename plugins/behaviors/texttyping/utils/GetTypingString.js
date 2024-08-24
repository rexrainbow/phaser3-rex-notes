import GetSubString from '../../../utils/text/GetSubString.js';

var GetTypingString = function (text, typeIdx, textLength, typeMode) {
    var textObject = this.parent;
    var result;
    if (typeMode === 0) { //left-to-right
        var startIdx = 0;
        var endIdx = typeIdx;
        this.insertIndex = endIdx;
        result = GetSubString(textObject, text, startIdx, endIdx);

    } else if (typeMode === 1) { //right-to-left
        var endIdx = textLength;
        var startIdx = endIdx - typeIdx;
        this.insertIndex = 0;
        result = GetSubString(textObject, text, startIdx, endIdx);

    } else if (typeMode === 2) { //middle-to-sides
        var midIdx = textLength / 2;
        var startIdx = Math.floor(midIdx - (typeIdx / 2));
        var endIdx = startIdx + typeIdx;
        this.insertIndex = (typeIdx % 2) ? typeIdx : 0;
        result = GetSubString(textObject, text, startIdx, endIdx);

    } else if (typeMode === 3) { //sides-to-middle
        var lowerLen = Math.floor(typeIdx / 2);
        var lowerResult;
        if (lowerLen > 0) {
            var endIdx = textLength;
            var startIdx = endIdx - lowerLen;
            lowerResult = GetSubString(textObject, text, startIdx, endIdx);
        } else {
            lowerResult = "";
        }

        var upperLen = typeIdx - lowerLen;
        var upperResult;
        if (upperLen > 0) {
            var startIdx = 0;
            var endIdx = startIdx + upperLen;
            this.insertIndex = endIdx;
            upperResult = GetSubString(textObject, text, startIdx, endIdx);
        } else {
            upperResult = "";
            this.insertIndex = 0;
        }
        result = upperResult + lowerResult;
    }

    this.insertChar = result.charAt(this.insertIndex - 1);

    return result;
}

export default GetTypingString;