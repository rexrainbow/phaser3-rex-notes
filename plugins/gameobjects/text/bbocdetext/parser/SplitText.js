import { RE_SPLITTEXT } from './const.js';

var SplitText = function (text, mode) {
    var result = [];
    var charIdx = 0;
    while (true) {
        var regexResult = RE_SPLITTEXT.exec(text);
        if (regexResult) {
            var match = regexResult[0];
            var matchStart = RE_SPLITTEXT.lastIndex - match.length;

            if (charIdx < matchStart) {
                var content = text.substring(charIdx, matchStart);
                result.push(content);
            }

            if (mode === undefined) {
                result.push(match);
            }

            charIdx = RE_SPLITTEXT.lastIndex;

        } else {
            var totalLen = text.length;
            if (charIdx < totalLen) { // Push remainder string
                result.push(text.substring(charIdx, totalLen));
            }
            break;
        }

    }

    return result; // [text,...]
}

export default SplitText;