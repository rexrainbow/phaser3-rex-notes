import {
    RE_SPLITTEXT,
    RE_ESC_OPEN, RE_ESC_CLOSE,
    RE_RAW_OPEN, RE_RAW_CLOSE,
} from './tags.js';

var SplitText = function (text, mode) {
    var result = [];
    var charIdx = 0;
    var rawMode = false,
        escMode = false;
    while (true) {
        var regexResult = RE_SPLITTEXT.exec(text);
        if (!regexResult) {
            break;
        }

        var match = regexResult[0];
        if (escMode) {
            if (RE_ESC_CLOSE.test(match)) {
                escMode = false;
            } else {
                continue; // Skip other tags
            }

        } else if (rawMode) {
            if (RE_RAW_CLOSE.test(match)) {
                rawMode = false;
            } else {
                continue; // Skip other tags
            }

        } else {
            if (RE_ESC_OPEN.test(match)) {
                escMode = true;
            } else if (RE_RAW_OPEN.test(match)) {
                rawMode = true;
            }
        }

        var matchEnd = RE_SPLITTEXT.lastIndex;
        var matchStart = matchEnd - match.length;

        if (charIdx < matchStart) {
            var content = text.substring(charIdx, matchStart);
            result.push(content);
        }

        if (mode === undefined) {
            result.push(match);
        }

        charIdx = matchEnd;
    }

    var totalLen = text.length;
    if (charIdx < totalLen) { // Push remainder string
        result.push(text.substring(charIdx, totalLen));
    }

    return result; // [text,...]
}

export default SplitText;