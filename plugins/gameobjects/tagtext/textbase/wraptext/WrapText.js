import CONST from '../../../textbase/const.js';
import IsASCIIString from '../../../../utils/string/IsASCIIString.js';

const NO_NEWLINE = CONST.NO_NEWLINE;
const RAW_NEWLINE = CONST.RAW_NEWLINE;
const WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;
const NO_WRAP = CONST.NO_WRAP;
const WORD_WRAP = CONST.WORD_WRAP;
const CHAR_WRAP = CONST.CHAR_WRAP;
const MIX_WRAP = CONST.MIX_WRAP;
const splitRegExp = CONST.SPLITREGEXP;

var WrapText = function (text, context, wrapMode, wrapWidth, offset, wrapTextLinesPool) {
    if (wrapWidth <= 0) {
        wrapMode = NO_WRAP;
    }

    var retLines = [];
    if (!text || !text.length) {
        return retLines;
    }

    var isNoWrap = (wrapMode === NO_WRAP);

    var lines = text.split(splitRegExp),
        line, remainWidth, newLineMode;
    for (var i = 0, linesLen = lines.length; i < linesLen; i++) {
        line = lines[i];
        newLineMode = (i === (linesLen - 1)) ? NO_NEWLINE : RAW_NEWLINE;

        if (isNoWrap) {
            var textWidth = context.measureText(line).width;
            retLines.push(wrapTextLinesPool.getLine(line, textWidth, newLineMode));
            continue;
        }

        remainWidth = (i === 0) ? (wrapWidth - offset) : wrapWidth;

        // Short string testing
        if (line.length <= 100) {
            var textWidth = context.measureText(line).width;
            if (textWidth <= remainWidth) {
                retLines.push(wrapTextLinesPool.getLine(line, textWidth, newLineMode));
                continue;
            }
        }

        var tokenArray = ParseLine(line, wrapMode);
        var token, tokenWidth, isLastToken;
        var lineText = '', lineWidth = 0;
        var currLineWidth;
        for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
            token = tokenArray[j];
            tokenWidth = context.measureText(token).width;

            // Text width of single token is larger than a line width
            if ((tokenWidth > wrapWidth) && IsWord(token)) {
                if (lineText !== '') {
                    // Has pending lineText, flush it out
                    retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, WRAPPED_NEWLINE));

                } else if ((j === 0) && (offset > 0)) {
                    // No pending lineText, but has previous text. Append a newline
                    retLines.push(wrapTextLinesPool.getLine('', 0, WRAPPED_NEWLINE));

                }

                // Word break
                retLines.push(...WrapText(token, context, CHAR_WRAP, wrapWidth, 0, wrapTextLinesPool));
                // Continue at last-wordBreak-line
                var lastwordBreakLine = retLines.pop();
                lineText = lastwordBreakLine.text;
                lineWidth = lastwordBreakLine.width;
                // Free this line
                wrapTextLinesPool.freeLine(lastwordBreakLine);

                // Special case : Start at a space character, discard it
                if (lineText === ' ') {
                    lineText = '';
                    lineWidth = 0;
                }
                continue;
            }

            currLineWidth = lineWidth + tokenWidth;
            if (currLineWidth > remainWidth) {
                // New line
                retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, WRAPPED_NEWLINE));
                lineText = token;
                lineWidth = tokenWidth;
                remainWidth = wrapWidth;

            } else {
                // Append token, continue
                lineText += token;
                lineWidth = currLineWidth;
            }

            if (j === (tokenLen - 1)) {
                // Flush remain text
                retLines.push(wrapTextLinesPool.getLine(lineText, lineWidth, newLineMode));
            }
        } // for token in tokenArray

    } // for each line in lines

    return retLines;
};

var ParseLine = function (s, mode) {
    var tokens;

    switch (mode) {
        case WORD_WRAP:
            tokens = []
            s = s.split(' ');
            for (var i = 0, icnt = s.length; i < icnt; i++) {
                var token = s[i];
                if (i < (icnt - 1)) {
                    tokens.push(token + ' ');
                } else { // The last token
                    if (token !== '') {
                        tokens.push(token);
                    }
                }
            }
            break;

        case CHAR_WRAP:
            tokens = s.split('');
            break;

        default: // MIX_WRAP
            tokens = []
            s = s.split(' ');
            for (var i = 0, icnt = s.length; i < icnt; i++) {
                var token = s[i];
                if (i < (icnt - 1)) {
                    if (IsASCIIString(token)) {
                        tokens.push(token + ' ');
                    } else {
                        tokens.push(...token.split(''));
                        // Add space as last token
                        tokens.push(' ')
                    }
                } else { // The last token
                    if (token !== '') {
                        if (IsASCIIString(token)) {
                            tokens.push(token);
                        } else {
                            tokens.push(...token.split(''));
                        }
                    }
                }

            }
            break;
    }

    return tokens;
}

var IsWord = function (s) {
    switch (s.length) {
        case 1: return false;
        case 2: return (s.charAt(1) !== ' ');
        default: return true;
    }
}

export default WrapText;