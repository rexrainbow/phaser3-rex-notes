var WrapText = function(content?: any, lineWidth?: any, characterWidth?: any) {
    var characterCount = Math.floor(lineWidth / characterWidth);
    var segments = content.split('\n');
    var lines = [];
    for (var i = 0, cnt = segments.length; i < cnt; i++) {
        SplitTextByLength(segments[i], characterCount, lines);
    }

    return lines.join('\n');
}

var SplitTextByLength = function(text?: any, len?: any, out?: any) {
    if (out === undefined) {
        out = [];
    }
    for (var i = 0, cnt = text.length; i < cnt; i += len) {
        out.push(text.substring(i, i + len));
    }
    return out;
}

export default WrapText;