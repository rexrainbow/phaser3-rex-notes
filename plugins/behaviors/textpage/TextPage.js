import GetSceneObject from '../../utils/system/GetSceneObject.js';
import IsTextGameObject from '../../utils/text/IsTextGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class TextPagePlugin {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        this.setTextObjectType();

        this.lines = undefined; // Array (default text object), or pens-manager (tag text object)
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setText(GetValue(o, 'text', ''));
        this.setStartIdx(GetValue(o, 'start', 0));
        this.setPageIdx(GetValue(o, 'page', -1));
        return this;
    }

    toJSON() {
        return {
            text: this.text,
            start: this.startLineIdx,
            page: this.pageIndex,

            pageCount: this.pageCount

        };
    }

    boot() {
        this.gameObject.once('destroy', this.destroy, this);
    }

    shutdown() {
        if (this.lines === undefined) {
            // Do nothing
        } else if (this.textObjectType === 0) {
            this.lines.length = 0;
        } else {
            this.lines.destroy();
        }

        this.gameObject = undefined;
        this.scene = undefined;

        return this;
    }

    destroy() {
        this.shutdown();
    }

    setTextObjectType() {
        this.textObjectType = IsTextGameObject(this.gameObject) ? 0 : 1;
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
        if (this.textObjectType === 0) {
            this.lines = this.gameObject.getWrappedText(this.text); // lines in array
        } else {
            this.lines = this.gameObject.getPenManager(this.text, this.lines); // pen manager
        }

        this.pageCount = Math.ceil(this.totalLinesCount / this.pageLinesCount);
        if (resetPageIdx) {
            this.resetPageIdx();
        }
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
        this.displayText(this.getPage());
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

    get totalLinesCount() {
        var count;
        if (this.textObjectType === 0) {
            count = this.lines.length;
        } else {
            count = this.lines.linesCount;
        }
        return count;
    }

    get pageLinesCount() {
        var count;
        var maxLines = this.gameObject.style.maxLines;
        if (maxLines > 0) {
            count = maxLines;
        } else {
            count = this.totalLinesCount;
        }
        return count;
    }

    getLines(startLineIdx) {
        if (startLineIdx === undefined) {
            startLineIdx = this.startLineIdx;
        }
        var endLineIdx = startLineIdx + this.pageLinesCount;
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

    displayText(text) {
        this.gameObject.setText(text);
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


export default TextPagePlugin;