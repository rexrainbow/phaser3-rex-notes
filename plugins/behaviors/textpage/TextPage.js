import GetSceneObject from 'rexPlugins/utils/system/GetSceneObject.js';

const TextKlass = Phaser.GameObjects.Text;
const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const GetValue = Phaser.Utils.Objects.GetValue;
const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
const Clamp = Phaser.Math.Clamp;

class TextPagePlugin {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);
        this.setTextObjectType();

        this.lines = undefined; // array (default text object), or pens-manager (tag text object)
        this.resetFromJSON(config);
        this.boot();
    }

    /**
     * Reset status by JSON object
     * @param {object} o JSON object
     * @returns {object} this object
     */
    resetFromJSON(o) {
        this.setText(GetFastValue(o, 'text', ''));
        this.setWrapMode(GetFastValue(o, 'wrap', true))
        this.setStartIdx(GetFastValue(o, 'start', 0));
        this.setPageIdx(GetFastValue(o, 'page', -1));
        return this;
    }

    /**
     * Return status in JSON object
     * @returns JSON object
     */
    toJSON() {
        return {
            text: this.text,
            start: this.startLineIdx,
            page: this.pageIdx,

            pageCount: this.pageCount

        };
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.text = '';
        if (this.textObjectType === 0) {
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
        if (this.gameObject instanceof TextKlass) {
            this.textObjectType = 0;
        } else {
            this.textObjectType = 1;
        }

        return this;
    }

    get isFirstPage() {
        return (this.pageIdx <= 0);
    }

    get isLastPage() {
        return (this.pageIdx >= (this.pageCount - 1));
    }

    setText(text, resetPageIdx) {
        if (resetPageIdx === undefined) {
            resetPageIdx = true;
        }
        this.text = transferText(text);

        // wrap content in lines
        if (this.textObjectType === 0) {
            this.lines = this.gameObject.getWrappedText(this.text);  // lines in array
        } else {
            this.lines = this.gameObject.getPenManager(this.text, this.lines);  // pen manager
        }

        this.pageCount = Math.ceil(this.totalLineCount / this.pageLineCount);
        if (resetPageIdx) {
            this.resetPageIdx();
        }
        return this;
    }

    setWrapMode(en) {
        if (en === undefined) {
            en = true;
        }
        this.wrapMode = en;
        return this;
    }

    appendText(text) {
        this.setText(this.text.concat(transferText(text)));
        return this;
    }

    getPage(idx) {
        if (idx === undefined) {
            idx = this.pageIdx;
        }
        return this.setPageIdx(idx).getLines();
    }

    getNextPage() {
        return this.getPage(this.pageIdx + 1);
    }

    getPreviousPage() {
        return this.getPage(this.pageIdx - 1);
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
        idx = Clamp(idx, 0, this.totalLineCount - 1);
        this.startLineIdx = idx;
        return this;
    }

    resetPageIdx() {
        this.pageIdx = -1;
    }

    setPageIdx(idx) {
        idx = Clamp(idx, 0, this.pageCount - 1);
        this.pageIdx = idx;
        this.setStartIdx(this.pageIdx * this.pageLineCount);
        return this;
    }

    get totalLineCount() {
        var count;
        if (this.textObjectType === 0) {
            count = this.lines.length;
        } else {
            count = this.lines.linesCount;
        }
        return count;
    }

    get pageLineCount() {
        var count;
        var maxLines = this.gameObject.style.maxLines;
        if (maxLines > 0) {
            count = maxLines;
        } else {
            count = this.totalLineCount;
        }
        return count;
    }

    getLines(startLineIdx) {
        if (startLineIdx === undefined) {
            startLineIdx = this.startLineIdx;
        }
        var endLineIdx = startLineIdx + this.pageLineCount;
        var text;
        if (this.textObjectType === 0) {
            text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
        } else {
            var startIdx = this.lines.getLineStartIndex(startLineIdx);
            var endIdx = this.lines.getLineEndIndex(endLineIdx - 1);
            text = this.lines.getSliceTagText(startIdx, endIdx, this.wrapMode);
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