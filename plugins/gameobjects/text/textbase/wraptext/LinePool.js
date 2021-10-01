import Pool from '../../../../pool.js';

var LinesPool = new Pool();

var FreeLines = function (lines) {
    if (!lines) {
        return;
    }
    LinesPool.pushMultiple(lines);
}

var GetLine = function (text, width, newLineMode) {
    var l = LinesPool.pop();
    if (l === null) {
        l = {};
    }
    l.text = text;
    l.width = width;
    l.newLineMode = newLineMode;
    return l;
}

export {
    GetLine,
    FreeLines,
}