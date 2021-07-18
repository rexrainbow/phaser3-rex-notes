import BehaviorBase from '../../utils/behaviorbase/BehaviorBase.js';
import IsTextGameObject from '../../utils/text/IsTextGameObject.js';
import IsBitmapTextGameObject from '../../utils/bitmaptext/IsBitmapTextGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const TextType = 0;
const TagTextType = 1;
const BitmapTextType = 2;

class TextPage extends BehaviorBase {
    constructor(gameObject, config) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.setTextObjectType();

        this.lines = undefined;
        // Text object : array of string
        // Tag text object : pens-manager
        // Bitmap text object : array of string
        this.totalLinesCount = 0;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setMaxLines(GetValue(o, 'maxLines', undefined));
        this.setText(GetValue(o, 'text', ''));
        this.setStartIdx(GetValue(o, 'start', 0));
        this.setPageIdx(GetValue(o, 'page', -1));
        return this;
    }

    toJSON() {
        return {
            maxLines: this.maxLines,
            text: this.text,
            start: this.startLineIdx,
            page: this.pageIndex,

            pageCount: this.pageCount

        };
    }

    shutdown(fromScene) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        if (this.lines === undefined) {
            // Do nothing
        } else {
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
        }

        super.shutdown(fromScene);
    }

    setTextObjectType() {
        this.textObjectType =
            (IsBitmapTextGameObject(this.parent)) ? BitmapTextType :
                (IsTextGameObject(this.parent)) ? TextType :
                    TagTextType;

        return this;
    }

    get isFirstPage() {
        return (this.pageIndex <= 0);
    }

    get isLastPage() {
        return (this.pageIndex >= (this.pageCount - 1));
    }

    setText(text, resetPageIdx) {
        if (resetPageIdx === undefined) {
            resetPageIdx = true;
        }
        this.text = transferText(text);

        // Wrap content in lines
        switch (this.textObjectType) {
            case TextType:
                this.lines = this.parent.getWrappedText(this.text); // Array of string
                this.totalLinesCount = this.lines.length;
                break;
            case TagTextType:
                this.lines = this.parent.getPenManager(this.text, this.lines); // Pens-manager
                this.totalLinesCount = this.lines.linesCount;
                break;
            case BitmapTextType:
                this.lines = this.parent
                    .setText(text)
                    .getTextBounds().wrappedText.split('\n');
                this.totalLinesCount = this.lines.length;
                break;
        }

        this.pageCount = Math.ceil(this.totalLinesCount / this.pageLinesCount);
        if (resetPageIdx) {
            this.resetPageIdx();
        }
        return this;
    }

    setMaxLines(maxLines) {
        this.maxLines = maxLines;
        return this;
    }

    appendText(text) {
        this.setText(this.text.concat(transferText(text)));
        return this;
    }

    getPage(idx) {
        if (idx === undefined) {
            idx = this.pageIndex;
        }
        return this.setPageIdx(idx).getLines();
    }

    getNextPage() {
        return this.getPage(this.pageIndex + 1);
    }

    getPreviousPage() {
        return this.getPage(this.pageIndex - 1);
    }

    showPage(idx) {
        this.displayText(this.getPage(idx));
        return this;
    }

    showNextPage() {
        this.displayText(this.getNextPage());
        return this;
    }

    showPreviousPage() {
        this.displayText(this.getPreviousPage());
        return this;
    }

    show() {
        this.displayText(this.getLines());
        return this;
    }

    showNextLine() {
        this.displayText(this.setStartIdx(this.startLineIdx + 1).getLines());
        return this;
    }

    showPreviousLine() {
        this.displayText(this.setStartIdx(this.startLineIdx - 1).getLines());
        return this;
    }

    setStartIdx(idx) {
        idx = Clamp(idx, 0, this.totalLinesCount - 1);
        this.startLineIdx = idx;
        return this;
    }

    resetPageIdx() {
        this.pageIndex = -1;
    }

    setPageIdx(idx) {
        idx = Clamp(idx, 0, this.pageCount - 1);
        this.pageIndex = idx;
        this.setStartIdx(this.pageIndex * this.pageLinesCount);
        return this;
    }

    get pageLinesCount() {
        if (this.maxLines !== undefined) {
            return this.maxLines;

        } else {
            var count;
            switch (this.textObjectType) {
                case TextType:
                case TagTextType:
                    var maxLines = this.parent.style.maxLines;
                    if (maxLines > 0) {
                        count = maxLines;
                    } else {
                        count = this.totalLinesCount;
                    }
                    break;
                case BitmapTextType:
                    count = this.totalLinesCount;
                    break;
            }
            return count;

        }
    }

    getLines(startLineIdx) {
        if (startLineIdx === undefined) {
            startLineIdx = this.startLineIdx;
        }
        var endLineIdx = startLineIdx + this.pageLinesCount;
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

    displayText(text) {
        this.parent.setText(text);
    }
}

var transferText = function (text) {
    if (Array.isArray(text)) {
        text = text.join('\n');
    } else if (typeof (text) === 'number') {
        text = text.toString();
    }
    return text;
}


export default TextPage;