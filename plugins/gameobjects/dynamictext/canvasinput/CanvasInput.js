import DynamicText from '../dynamictext/DynamicText.js';
import CreateHiddenTextEdit from './textedit/CreateHiddenTextEdit.js';
import InjectDefaultConfig from './methods/InjectDefaultConfig.js';
import ExtractByPrefix from '../../../utils/object/ExtractByPrefix.js';
import RegisterArrowKeysEvent from './methods/RegisterArrowKeysEvent.js';
import RegisterCursorStyle from './methods/RegisterCursorStyle.js';
import RegisterRangeStyle from './methods/RegisterRangeStyle.js';
import RegisterFocusStyle from './methods/RegisterFocusStyle.js';
import CreateInsertCursorChild from './methods/CreateInsertCursorChild.js';
import SetText from './methods/SetText.js';
import { IsChar } from '../dynamictext/bob/Types.js';
import SetTextOXYMethods from './methods/SetTextOXYMethods.js';
import MoveCursorMethods from './methods/MoveCursorMethods.js';
import IsEmpty from '../../../utils/object/IsEmpty.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class CanvasInput extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }

        if (config === undefined) {
            config = {};
        }

        InjectDefaultConfig(scene, config);

        // Set text later
        var text = config.text;
        if (text) {
            delete config.text;
        }

        var focusStyle = ExtractByPrefix(config.background, 'focus');
        var cursorStyle = ExtractByPrefix(config.style, 'cursor');
        var rangeStyle = ExtractByPrefix(config.style, 'range');

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';

        // readonly
        this.contentWidth = undefined;
        this.contentHeight = undefined;
        this.lineHeight = undefined;
        this.linesCount = undefined;
        this.characterCountOfLines = [];

        this._text;

        this.textEdit = CreateHiddenTextEdit(this, config);

        RegisterArrowKeysEvent.call(this);

        if (config.focusStyle) {
            Object.assign(focusStyle, config.focusStyle);
        }
        RegisterFocusStyle.call(this, focusStyle);

        if (config.cursorStyle) {
            Object.assign(cursorStyle, config.cursorStyle);
        }
        RegisterCursorStyle.call(this, cursorStyle);

        if (config.rangeStyle) {
            Object.assign(rangeStyle, config.rangeStyle)
        }
        if (IsEmpty(rangeStyle)) {
            Object.assign(rangeStyle, cursorStyle);
        }
        RegisterRangeStyle.call(this, rangeStyle);


        var addCharCallback = config.onAddChar;
        if (addCharCallback) {
            this.on('addchar', addCharCallback);
        }

        var cursorInCallback = config.onCursorIn;
        if (cursorInCallback) {
            this.on('cursorin', cursorInCallback);
        }

        var cursorOutCallback = config.onCursorOut;
        if (cursorOutCallback) {
            this.on('cursorout', cursorOutCallback);
        }

        var useCursorCallback = !config.onRangeIn && !config.onRangeOut
        var rangeInCallback = (!useCursorCallback) ? config.onRangeIn : config.onCursorIn;
        if (rangeInCallback) {
            this.on('rangein', rangeInCallback);
        }

        var rangeOutCallback = (!useCursorCallback) ? config.onRangeOut : config.onCursorOut;
        if (rangeOutCallback) {
            this.on('rangeout', rangeOutCallback);
        }

        var moveCursorCallback = config.onMoveCursor;
        if (moveCursorCallback) {
            this.on('movecursor', moveCursorCallback);
        }

        this.setParseTextCallback(config.parseTextCallback);

        this.lastInsertCursor = CreateInsertCursorChild(this);

        if (!text) {
            text = '';
        }
        this.setText(text);
    }

    addChild(child, index) {
        super.addChild(child, index);

        if (Array.isArray(child)) {
            var children = child;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (IsChar(child)) {
                    this.emit('addchar', child, index + i, this);
                }
            }
        } else {
            if (IsChar(child)) {
                this.emit('addchar', child, index, this);
            }
        }

        return this;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        if (value == null) {
            value = '';
        } else {
            value = value.toString();
        }
        if (this._text === value) {
            return;
        }

        SetText(this, value);

        this._text = value;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    appendText(text) {
        this.setText(this.text + text);
        return this;
    }

    runWrap(config) {
        var result = super.runWrap(config);
        // Save content size
        this.contentWidth = result.maxLineWidth;
        this.contentHeight = result.linesHeight;
        this.lineHeight = result.lineHeight;
        this.linesCount = result.lines.length;

        this.characterCountOfLines.length = 0;
        var wrapLines = result.lines;
        for (var li = 0, lcnt = wrapLines.length; li < lcnt; li++) {
            var line = wrapLines[li].children;
            var characterCount = 0;
            for (var ci = 0, ccnt = line.length; ci < ccnt; ci++) {
                var child = line[ci];
                if (child.active && !child.removed && IsChar(child)) {
                    characterCount++;
                }
            }

            this.characterCountOfLines.push(characterCount);
        }

        return result;
    }

    setSize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.setSize(width, height);

        // Run wrap again since fixedWidth and fixedHeight are changed
        this.runWrap();

        return this;
    }

    get displayText() {
        return this.text;
    }

    set displayText(value) {
        this.text = value;
    }

    setDisplayText(value) {
        this.displayText = value;
        return this;
    }

    get inputText() {
        return this.textEdit.text;
    }

    set inputText(value) {
        this.textEdit.text = value;
    }

    setInputText(value) {
        this.inputText = value;
        return this;
    }

    setParseTextCallback(callback) {
        if (!callback) {
            callback = DefaultParseTextCallback;
        }
        this.parseTextCallback = callback;
        return this;
    }

    get value() {
        return this.parseTextCallback(this.text);
    }

    set value(value) {
        this.setText(value);
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    get readOnly() {
        return this.textEdit.readOnly;
    }

    set readOnly(value) {
        this.textEdit.readOnly = value;
    }

    setReadOnly(value) {
        this.textEdit.setReadOnly(value);
        return this;
    }

    open(onCloseCallback) {
        if (onCloseCallback) {
            this.textEdit.once('close', onCloseCallback)
        }
        this.textEdit.open();
        return this;
    }

    close() {
        this.textEdit.close();
        return this;
    }

    get isOpened() {
        return this.textEdit.isOpened;
    }

    setFocusStyle(style) {
        this.focusStyle = style;
        return this;
    }

    setCursorStyle(style) {
        this.cursorStyle = style;
        return this;
    }

    setRangeStyle(style) {
        this.rangeStyle = style;
        return this;
    }

    setNumberInput() {
        this.textEdit
            .setNumberInput()
            .setSelectAllWhenFocusEnable();

        this.parseTextCallback = Number;
        return this;
    }

    get maxLength() {
        return this.textEdit.maxLength;
    }

    set maxLength(value) {
        this.textEdit.maxLength = value
    }

    setMaxLength(value) {
        this.maxLength = value;
        return this;
    }

    get minLength() {
        return this.textEdit.minLength;
    }

    set minLength(value) {
        this.textEdit.minLength = value;
    }

    setMinLength(value) {
        this.minLength = value;
        return this;
    }

    get cursorPosition() {
        return this.textEdit.cursorPosition;
    }

    set cursorPosition(value) {
        if (!this.isOpened) {
            return;
        }

        this.textEdit.cursorPosition = value;
        this.textEdit.requestCursorPosition = value;
    }

    setCursorPosition(value) {
        this.cursorPosition = value;
        return this;
    }

    get topTextOY() {
        return 0;
    }

    get bottomTextOY() {
        return -this.tableVisibleHeight;
    }

    get leftTextOX() {
        return 0;
    }

    get rightTextOX() {
        return -this.textVisibleWidth;
    }

    get textVisibleHeight() {
        var h = this.contentHeight - this.height;
        if (h < 0) {
            h = 0;
        }
        return h;
    }

    get textVisibleWidth() {
        var w = this.contentWidth - this.width;
        if (w < 0) {
            w = 0;
        }
        return w;
    }

    set t(value) {
        this.setTextOYByPercentage(value).updateTexture();
    }

    get t() {
        return this.getTextOYPercentage();
    }

    set s(value) {
        this.setTextOXByPercentage(value).updateTexture();
    }

    get s() {
        return this.getTextOXPercentage();
    }

}

var DefaultParseTextCallback = function (text) {
    return text;
}

Object.assign(
    CanvasInput.prototype,
    SetTextOXYMethods,
    MoveCursorMethods,
)

export default CanvasInput;