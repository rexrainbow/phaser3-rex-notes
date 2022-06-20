import Pool from '../../../../pool.js';

var LinesPool = new Pool();

var FreeLine = function (line) {
    if (!line) {
        return;
    }
    LinesPool.push(line);
}

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
    FreeLine,
    FreeLines,
    GetLine,
}