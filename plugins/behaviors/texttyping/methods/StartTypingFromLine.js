import GetPlainText from '../utils/GetPlainText.js';

var StartTypingFromLine = function (text, lineIndex, speed, timerStartAt) {
    var startIdx;
    if (lineIndex > 0) {
        var plainText = GetPlainText(this.parent, text);
        startIdx = GetNewLineIndex(plainText, lineIndex);
    }
    return this.start(text, speed, startIdx, timerStartAt);
}

var GetNewLineIndex = function (s, n) {
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