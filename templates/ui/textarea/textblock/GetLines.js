var GetLines = function (startLineIdx) {
    var endLineIdx = startLineIdx + this.textObject.style.maxLines;
    var text;
    if (this.textObjectType === 0) {
        text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
    } else {
        var startIdx = this.lines.getLineStartIndex(startLineIdx);
        var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
        text = this.lines.getSliceTagText(startIdx, endIdx, true);
    }
    return text;
}

export default GetLines;