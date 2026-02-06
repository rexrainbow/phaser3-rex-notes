import BaseTextBlock from './BaseTextBlock.js';

class TagTextBlock extends BaseTextBlock {
    constructor(scene, x, y, minWidth, minHeight, config) {
        super(scene, x, y, minWidth, minHeight, config);
        this.type = 'rexTagTextBlock';
    }

    setText(text) {
        if (text !== undefined) {
            this.text = text;
        }

        var textObject = this.textObject;
        if (textObject.text === this.text) {
            // Force re-wrap when text is unchanged (e.g. after resize).
            textObject.updateText(true);
        } else {
            textObject.setText(this.text);
        }
        this.linesCount = this.getLinesCount();

        this._textHeight = undefined;
        this._textVisibleHeight = undefined;

        this.textOY = this._textOY;
        return this;
    }

    updateTextObject() {
        this.textObject.scrollY = this._textOY;
        return this;
    }

    getLinesCount() {
        var lines = this.getLines();
        return lines ? lines.length : 0;
    }

    getLines() {
        var canvasText = this.textObject.canvasText;
        return (canvasText) ? canvasText.lines : null;
    }

    get textHeight() {
        return this.textObject.contentHeight;
    }

    get textObjectHeight() {
        return this.textObject.viewportHeight;
    }

    get textVisibleHeight() {
        var h = this.textHeight - this.textObjectHeight;
        if (!this.alwaysScrollable && (h < 0)) {
            h = 0;
        }
        return h;
    }

    resizeText(textObject, width, height) {
        if ((this.textObjectWidth === width) && (this._textObjectRealHeight === height)) {
            return this;
        }

        this.textObjectWidth = width;
        this._textObjectRealHeight = height;

        textObject.setFixedSize(width, height);

        var style = textObject.style;
        var wrapWidth = Math.max(width, 0);
        if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
            style.wrapMode = 1;
        }
        style.wrapWidth = wrapWidth;

        // Render content again
        this.setText();
        return this;
    }

    resetTextObjectPosition() {
        this.resetChildPositionState(this.textObject);
    }

    scrollToLine(lineIndex) {
        var lines = this.getLines();
        if (!lines || lines.length === 0) {
            this.textOY = 0;
            return this;
        }

        if (lineIndex <= 0) {
            this.textOY = 0;
            return this;
        }

        if (lineIndex >= lines.length) {
            this.textOY = this.bottomTextOY;
            return this;
        }

        this.textOY = -lines[lineIndex].startOffset;
        return this;
    }

    get lineIndex() {
        var lines = this.getLines();
        if (!lines || lines.length === 0) {
            return 0;
        }

        var targetOffset = -this.textOY;
        return GetStartLineIndex(lines, targetOffset);
    }

    scrollToNextLine(lineCount) {
        if (lineCount === undefined) {
            lineCount = 1;
        }

        this.scrollToLine(this.lineIndex + lineCount);
        return this;
    }
}

var GetStartLineIndex = function (lines, targetOffset) {
    // First line whose endOffset is greater than targetOffset
    var left = 0;
    var right = lines.length - 1;
    var result = lines.length;
    while (left <= right) {
        var mid = (left + right) >> 1;
        if (lines[mid].endOffset > targetOffset) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return result;
};

export default TagTextBlock;
