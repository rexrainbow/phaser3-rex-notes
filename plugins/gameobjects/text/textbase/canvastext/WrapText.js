import Pool from '../../../../pool.js';
import CONST from '../const.js';

const NO_NEWLINE = CONST.NO_NEWLINE;
const RAW_NEWLINE = CONST.RAW_NEWLINE;
const WRAPPED_NEWLINE = CONST.WRAPPED_NEWLINE;
const NO_WRAP = CONST.NO_WRAP;
const WORD_WRAP = CONST.WORD_WRAP;
const CHAR_WRAP = CONST.CHAR_WRAP;
const splitRegExp = CONST.SPLITREGEXP;

var WRAP_RESULT = [];
var WrapText = function (text, getTextWidth, wrapMode, wrapWidth, offset) {
    if (wrapWidth <= 0) {
        wrapMode = NO_WRAP;
    }

    var retLines = WRAP_RESULT;
    LinesPool.pushMultiple(retLines);

    if (!text || !text.length) {
        return retLines;
    }

    var lines = text.split(splitRegExp),
        line, remainWidth, isLaseLine, newLineMode;
    for (var i = 0, linesLen = lines.length; i < linesLen; i++) {
        line = lines[i];
        newLineMode = (i === (linesLen - 1)) ? NO_NEWLINE : RAW_NEWLINE;

        if (wrapMode === NO_WRAP) {
            var textWidth = getTextWidth(line);
            retLines.push(LinesPool.newline(line, textWidth, newLineMode));
            continue;
        } else {
            if (i === 0) {
                remainWidth = wrapWidth - offset;
            } else {
                remainWidth = wrapWidth;
            }
        }

        // short string testing
        if (line.length <= 100) {
            var textWidth = getTextWidth(line);
            if (textWidth <= remainWidth) {
                retLines.push(LinesPool.newline(line, textWidth, newLineMode));
                continue;
            }
        }

        // character mode
        var tokenArray;
        if (wrapMode === WORD_WRAP) {
            // word mode
            tokenArray = line.split(' ');
        } else {
            tokenArray = line;
        }
        var token;
        var curLineText = '',
            lineText = '',
            currLineWidth, lineWidth = 0;
        for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
            token = tokenArray[j];

            if (wrapMode === WORD_WRAP) {
                curLineText += token;

                if (j < (tokenLen - 1)) {
                    curLineText += ' ';
                }
            } else {
                curLineText += token;
            }

            currLineWidth = getTextWidth(curLineText);
            if (currLineWidth > remainWidth) {
                // new line
                if (j === 0) {
                    retLines.push(LinesPool.newline('', 0, WRAPPED_NEWLINE));
                } else {
                    retLines.push(LinesPool.newline(lineText, lineWidth, WRAPPED_NEWLINE));
                    curLineText = token;
                    if (wrapMode === WORD_WRAP) {
                        if (j < (tokenLen - 1)) {
                            curLineText += ' ';
                        }
                    }
                    currLineWidth = getTextWidth(curLineText);
                }

                remainWidth = wrapWidth;
            }

            lineText = curLineText;
            lineWidth = currLineWidth;
        } // for token in tokenArray

        // flush remain text
        retLines.push(LinesPool.newline(lineText, lineWidth, newLineMode));

    } // for each line in lines

    return retLines;
};

var LinesPool = new Pool();
LinesPool.newline = function (text, width, newLineMode) {
    var l = this.pop();
    if (l === null) {
        l = {};
    }
    l.text = text;
    l.width = width;
    l.newLineMode = newLineMode;
    return l;
};

export default WrapText;