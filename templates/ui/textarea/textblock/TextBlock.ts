import { TextType, BitmapTextType } from '../../../../plugins/utils/text/GetTextObjectType';
import TextToLines from '../../../../plugins/utils/text/TextToLines';
import SetNoWrapText from '../../../../plugins/utils/text/SetNoWrapText';
import BaseTextBlock from './BaseTextBlock';

class TextBlock extends BaseTextBlock {
    _textHeight: any;
    _textLineHeight: any;
    _textLineSpacing: any;
    _textObjectRealHeight: any;
    _textOY: any;
    _textVisibleHeight: any;
    _visibleLinesCount: any;
    alwaysScrollable: any;
    clampTextOY: any;
    ignoreDestroy: any;
    lines: any;
    linesCount: any;
    resetTextObjectPosition: any;
    scene: any;
    text: any;
    textObject: any;
    textObjectType: any;
    textObjectWidth: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, minWidth?: any, minHeight?: any, config?: any) {
        super(scene, x, y, minWidth, minHeight, config);

        this.type = 'rexTextBlock';
        this.lines = undefined;  // string[]
        this._textLineHeight = undefined;
        this._textLineSpacing = undefined;
        this._visibleLinesCount = undefined;
        this._textHeight = undefined;
        this._textVisibleHeight = undefined;
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.lines) {
            this.lines.length = 0;
            this.lines = undefined;
        }

        super.destroy(fromScene);
    }

    clearTextMetricsCache() {
        this._textLineHeight = undefined;
        this._textLineSpacing = undefined;
        this._visibleLinesCount = undefined;
        this._textHeight = undefined;
        this._textVisibleHeight = undefined;
    }

    setText(text?: any) {
        if (text !== undefined) {
            this.text = text;
        }

        // Wrap content in lines
        this.lines = TextToLines(this.textObject, this.text, this.lines);

        // Get lines count
        this.linesCount = this.lines.length;

        // Re-calculate these values later
        this._textHeight = undefined;
        this._textVisibleHeight = undefined;

        this.updateTextObject();
        return this;
    }

    updateTextObject() {
        var startLineIndex = Math.max(Math.floor(this.textHeightToLinesCount(-this.textOY)), 0);
        var textOffset = this.linesCountToTextHeight(startLineIndex) + this.textOY;

        // Grab visible lines
        var text = this.getLines(startLineIndex);

        // Display visible content
        SetNoWrapText(this.textObject, text);

        this.textObject.rexSizer.offsetY = textOffset;
        this.resetTextObjectPosition();
        return this;
    }

    resizeText(textObject?: any, width?: any, height?: any) {
        height += (this.textLineHeight + this.textLineSpacing); // Add 1 line
        if ((this.textObjectWidth === width) && (this._textObjectRealHeight === height)) {
            return;
        }
        this.textObjectWidth = width;
        this._textObjectRealHeight = height;

        switch (this.textObjectType) {
            case TextType:
                textObject.setFixedSize(width, height);

                var style = textObject.style;
                var wrapWidth = Math.max(width, 0);
                style.wordWrapWidth = wrapWidth;
                break;
            case BitmapTextType:
                textObject.setMaxWidth(width);
                break;
        }

        // Render content again
        this.setText();
    }

    getLines(startLineIdx?: any) {
        var endLineIdx = startLineIdx + this.visibleLinesCount + 1;
        var text = this.lines.slice(startLineIdx, endLineIdx).join('\n');
        return text;
    }

    textHeightToLinesCount(height?: any) {
        // height = (lines * (lineHeight + lineSpacing)) - lineSpacing
        return (height - this.textLineSpacing) / (this.textLineHeight + this.textLineSpacing);
    }

    linesCountToTextHeight(linesCount?: any) {
        var height = linesCount * (this.textLineHeight + this.textLineSpacing);
        if (linesCount > 1) {
            height -= this.textLineSpacing;
        }
        return height;
    }

    get textLineHeight() {
        if (this._textLineHeight === undefined) {
            var lineHeight;
            switch (this.textObjectType) {
                case TextType:
                    var style = this.textObject.style;
                    lineHeight = style.metrics.fontSize + style.strokeThickness;
                    break;
                case BitmapTextType:
                    var scale = (this.textObject.fontSize / this.textObject.fontData.size);
                    lineHeight = this.textObject.fontData.lineHeight * scale;
                    break;

            }
            this._textLineHeight = lineHeight;
        }
        return this._textLineHeight;
    }

    get textLineSpacing() {
        if (this._textLineSpacing === undefined) {
            var lineSpacing;
            switch (this.textObjectType) {
                case TextType:
                    lineSpacing = this.textObject.lineSpacing;
                    break;
                case BitmapTextType:
                    lineSpacing = 0;
                    break;
            }
            this._textLineSpacing = lineSpacing;
        }
        return this._textLineSpacing;
    }

    get visibleLinesCount() {
        if (this._visibleLinesCount === undefined) {
            this._visibleLinesCount = Math.floor(this.textHeightToLinesCount(this._textObjectRealHeight));
        }
        return this._visibleLinesCount;
    }

    get textHeight() {
        if (this._textHeight === undefined) {
            this._textHeight = this.linesCountToTextHeight(this.linesCount);
        }
        return this._textHeight;
    }

    get textObjectHeight() {
        return this._textObjectRealHeight - (this.textLineHeight + this.textLineSpacing);  // Remove 1 text line
    }

    get textVisibleHeight() {
        if (this._textVisibleHeight === undefined) {
            var h = this.textHeight - this.textObjectHeight;
            if (!this.alwaysScrollable && (h < 0)) {
                h = 0;
            }
            this._textVisibleHeight = h;
        }
        return this._textVisibleHeight;
    }

    get textOY() {
        return this._textOY;
    }

    set textOY(oy) {
        if (this.clampTextOY && (this.visibleLinesCount > this.linesCount)) {
            oy = 0;
        }
        super.textOY = oy;
    }

    scrollToLine(lineIndex?: any) {
        var lineHeight = this.textLineHeight + this.textLineSpacing;
        this.textOY = -lineHeight * lineIndex;
        return this;
    }

    get lineIndex() {
        var lineHeight = this.textLineHeight + this.textLineSpacing;
        return Math.floor(-this.textOY / lineHeight);
    }

    scrollToNextLine(lineCount?: any) {
        if (lineCount === undefined) {
            lineCount = 1;
        }

        this.scrollToLine(this.lineIndex + lineCount);
        return this;
    }
}

export default TextBlock;