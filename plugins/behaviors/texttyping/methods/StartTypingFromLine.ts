import GetPlainText from '../../../utils/text/GetPlainText';

var StartTypingFromLine = function(text?: any, lineIndex?: any, speed?: any, offsetIndex?: any, timerStartAt?: any) {
    var startIdx;
    if (lineIndex > 0) {
        if (offsetIndex === undefined) {
            offsetIndex = 0;
        }

        var plainText = GetPlainText(this.parent, text);
        startIdx = GetNewLineIndex(plainText, lineIndex) + offsetIndex;
    }
    return this.start(text, speed, startIdx, timerStartAt);
}

var GetNewLineIndex = function(s?: any, n?: any) {
    var index = undefined;
    for (var i = 0; i < n; i++) {
        index = s.indexOf('\n', index + 1);
        if (index === -1) {
            break;
        }
    }
    return index;
}

export default StartTypingFromLine;