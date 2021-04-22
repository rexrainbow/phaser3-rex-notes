import { TextType, TagTextType, BitmapTextType } from './TextObjectTypes.js';

var GetLines = function (startLineIdx) {
    var endLineIdx = startLineIdx + this.visibleLinesCount;
    var text;
    switch (this.textObjectType) {
        case TextType:
            text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
            break;
        case TagTextType:
            var startIdx = this.lines.getLineStartIndex(startLineIdx);
            var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
            text = this.lines.getSliceTagText(startIdx, endIdx, true);
            break;
        case BitmapTextType:
            text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
            break;
    }
    return text;
}

export default GetLines;