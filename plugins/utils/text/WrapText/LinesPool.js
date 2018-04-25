import Pool from './../../object/Pool.js';

var LinesPool = new Pool();
LinesPool.newline = function (text, width, newLineMode) {
    var l = this.allocate();
    if (l === null) {
        l = {};
    }
    l.text = text;
    l.width = width;
    l.newLineMode = newLineMode;
    return l;
};

export default LinesPool;