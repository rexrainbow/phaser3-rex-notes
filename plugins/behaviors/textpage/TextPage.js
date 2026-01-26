import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import {
    TextType, TagTextType, BitmapTextType
} from '../../utils/text/GetTextObjectType.js';
import GetTextObjectType from '../../utils/text/GetTextObjectType.js';
import TextToLines from '../../utils/text/TextToLines.js';
import TextHeightToLinesCount from '../../utils/text/TextHeightToLineCount.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class TextPage extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.textObjectType = GetTextObjectType(this.parent);

        this.pageStartIndexes = [];

        // Text object : array of string
        // Tag text object : pens-manager
        // Bitmap text object : array of string
        this.lines = TextToLines(this.parent, '');

        this.sections = [];

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMaxLines(GetValue(o, 'maxLines', undefined));
        this.setPageBreak(GetValue(o, 'pageBreak', '\f\n'));
        this.setText(GetValue(o, 'text', ''));

        this.startLineIndex = GetValue(o, 'start', -1);
        this.endLineIndex = GetValue(o, 'end', undefined);

        var pageIndex = GetValue(o, 'page');
        if (pageIndex === undefined) {
            this.resetIndex();
        } else {
            this.setPageIndex(pageIndex);
        }

        return this;
    }

    toJSON() {
        return {
            maxLines: this.maxLines,
            text: this.content,
            start: this.startLineIndex,
            end: this.endLineIndex,
            page: this.pageIndex,
            pageBreak: this.pageBreak
        };
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        switch (this.textObjectType) {
            case TextType:
                this.lines.length = 0;
                break;
            case TagTextType:
                this.lines.destroy();
                break;
            case BitmapTextType:
                this.lines.length = 0;
                break;
        }

        this.pageStartIndexes.length = 0;
        this.sections.length = 0;

        this.lines = undefined;
        this.pageStartIndexes = undefined;
        this.sections = undefined;

        super.shutdown(fromScene);
    }

    setMaxLines(maxLines) {
        this.maxLines = maxLines;
        return this;
    }

    setPageBreak(pageBreak) {
        this.pageBreak = pageBreak;
        return this;
    }

    get pageCount() {
        return this.pageStartIndexes.length;
    }

    get lastPageIndex() {
        return this.pageCount - 1;
    }

    get isFirstPage() {
        return (this.pageIndex <= 0);
    }

    get isLastPage() {
        return (this.pageIndex >= (this.pageCount - 1));
    }

    get totalLinesCount() {
        return (this.lines) ? this.lines.length : 0;
    }

    get pageLinesCount() {
        // Since the line height of each line is the same, 
        // each page will have the same number of lines

        if (this.maxLines !== undefined) {
            return this.maxLines;

        } else if (this.isVariableLineHeightMode) {
            return 0; // Does not have constant lines count in this mode

        } else {
            var count;
            switch (this.textObjectType) {
                case TextType:
                case TagTextType:
                    var maxLines = this.parent.style.maxLines;
                    if (maxLines > 0) {
                        count = maxLines;
                    } else {
                        count = Math.floor(TextHeightToLinesCount(this.parent));
                    }
                    break;
                case BitmapTextType:
                    count = this.totalLinesCount;
                    break;
            }
            return count;

        }
    }

    get isVariableLineHeightMode() {
        return (this.textObjectType === TagTextType) &&
            (!this.parent.style.fixedLineHeightMode) &&
            (this.maxLines === undefined) &&
            (this.parent.style.maxLines <= 0);
    }

    getPageIndexByLineIndex(lineIndex) {
        var pageCount = this.pageStartIndexes.length;
        if (pageCount === 0) {
            return 0;
        }
        if (lineIndex == null || lineIndex <= this.pageStartIndexes[0]) {
            return 0;
        }
        for (var i = pageCount - 1; i >= 0; i--) {
            if (lineIndex >= this.pageStartIndexes[i]) {
                return i;
            }
        }
        return 0;
    }

    getLineIndexByHeight(lineIndex, pageHeight) {
        var lines = this.lines.lines;
        if (!lines || lines.length === 0) {
            return 0;
        }
        if (lineIndex < 0) {
            lineIndex = 0;
        } else if (lineIndex >= lines.length) {
            return lines.length;
        }
        var base = lines[lineIndex].startOffset;
        var target = base + pageHeight;
        var left = lineIndex;
        var right = lines.length - 1;
        var result = lines.length;
        while (left <= right) {
            var mid = (left + right) >> 1;
            if (lines[mid].endOffset > target) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return result;
    }

    getLastStartLineIndexByHeight(pageHeight) {
        if (pageHeight <= 0) {
            return 0;
        }
        var lines = this.lines.lines;
        if (!lines || lines.length === 0) {
            return 0;
        }
        var lastLine = lines[lines.length - 1];
        var targetStartOffset = lastLine.endOffset - pageHeight;
        if (targetStartOffset <= 0) {
            return 0;
        }
        return this.getLineIndexByStartOffsetCeil(targetStartOffset);
    }

    getLineIndexByStartOffset(targetOffset) {
        var lines = this.lines.lines;
        if (!lines || lines.length === 0) {
            return 0;
        }
        if (targetOffset <= lines[0].startOffset) {
            return 0;
        }
        var left = 0;
        var right = lines.length - 1;
        var result = 0;
        while (left <= right) {
            var mid = (left + right) >> 1;
            if (lines[mid].startOffset <= targetOffset) {
                result = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    getLineIndexByStartOffsetCeil(targetOffset) {
        var lines = this.lines.lines;
        if (!lines || lines.length === 0) {
            return 0;
        }
        if (targetOffset <= lines[0].startOffset) {
            return 0;
        }
        var left = 0;
        var right = lines.length - 1;
        var result = lines.length - 1;
        while (left <= right) {
            var mid = (left + right) >> 1;
            if (lines[mid].startOffset >= targetOffset) {
                result = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return result;
    }

    get isFirstLine() {
        return (this.startLineIndex <= 0);
    }

    get isLastLine() {
        return this.endLineIndex === this.totalLinesCount;
    }

    get content() {
        return this.sections.join(this.pageBreak);
    }
}

Object.assign(
    TextPage.prototype,
    Methods,
);


export default TextPage;
