import {
    TextType, TagTextType, BitmapTextType
} from '../../../utils/text/GetTextObjectType.js';

var GetLines = function (startLineIndex, endLineIdx) {
    if (startLineIndex === undefined) {
        startLineIndex = this.startLineIndex;
    }
    if (endLineIdx === undefined) {
        var pageLinesCount = this.pageLinesCount;
        if (pageLinesCount > 0) {
            endLineIdx = startLineIndex + pageLinesCount;
        } else {
            endLineIdx = this.totalLinesCount
        }
    }
    if (endLineIdx > this.totalLinesCount) {
        endLineIdx = this.totalLinesCount;
    }

    var text;
    switch (this.textObjectType) {
        case TextType:
        case BitmapTextType:
            text = this.lines.slice(startLineIndex, endLineIdx).join('\n');
            break;
        case TagTextType:
            var startIdx = this.lines.getLineStartIndex(startLineIndex);
            var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
            text = this.lines.getSliceTagText(startIdx, endIdx, true);

            // Check line count
            var newLineCharCount = (text.match(/\n/g) || []).length;
            if (newLineCharCount > (endLineIdx - startLineIndex - 1)) {
                // Remove last '\n'
                text = text.substring(0, text.length - 1);
            }

            break;
    }

    return text;
}

export default GetLines;