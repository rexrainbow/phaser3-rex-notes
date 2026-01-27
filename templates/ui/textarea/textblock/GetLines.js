import { TextType, TagTextType, BitmapTextType } from '../../../../plugins/utils/text/GetTextObjectType.js'

var GetLines = function (startLineIdx) {
    var endLineIdx = startLineIdx + this.visibleLinesCount + 1;
    var text;
    switch (this.textObjectType) {
        case TextType:
            text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
            break;
        case BitmapTextType:
            text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
            break;
    }
    return text;
}

export default GetLines;