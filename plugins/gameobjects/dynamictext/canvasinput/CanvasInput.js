import DynamicText from '../dynamictext/DynamicText.js';
import CreateHiddenTextEdit from './textedit/CreateHiddenTextEdit.js';
import ExtractByPrefix from './methods/ExtractByPrefix.js';
import RegisterCursorStyle from './methods/RegisterCursorStyle.js';
import RegisterFocusStyle from './methods/RegisterFocusStyle.js';
import AddLastInsertCursor from './methods/AddLastInsertCursor.js';
import SetText from './methods/SetText.js';
import { IsChar } from '../dynamictext/bob/Types.js';

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

        // Set text later
        var text = config.text;
        if (text) {
            delete config.text;
        }

        var focusStyle = ExtractByPrefix(config.background, 'focus');
        var cursorStyle = ExtractByPrefix(config.style, 'cursor');

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';

        this.textEdit = CreateHiddenTextEdit(this, config);

        if (config.focusStyle) {
            Object.assign(focusStyle, config.focusStyle);
        }
        RegisterFocusStyle.call(this, focusStyle);

        if (config.cursorStyle) {
            Object.assign(cursorStyle, config.cursorStyle);
        }
        RegisterCursorStyle.call(this, cursorStyle);

        var addCharCallback = config.onAddChar;
        if (addCharCallback) {
            this.on('addchar', addCharCallback);
        }

        var cursorOutCallback = config.onCursorOut;
        if (cursorOutCallback) {
            this.on('cursorout', cursorOutCallback);
        }
        var cursorInCallback = config.onCursorIn;
        if (cursorInCallback) {
            this.on('cursorin', cursorInCallback);
        }
        var moveCursorCallback = config.onMoveCursor;
        if (moveCursorCallback) {
            this.on('movecursor', moveCursorCallback);
        }

        this.lastInsertCursor = AddLastInsertCursor(this);
        if (text) {
            this.setText(text);
        } else {
            // Still need run word wrap for lastInsertCursor child
            this.runWordWrap();
        }
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

    setText(text) {
        this.moveChildToLast(this.lastInsertCursor);
        SetText(this, text);
        return this;
    }

    appendText(text) {
        this.setText(this.text + text);
        return this;
    }

    setSize(width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        super.setSize(width, height);

        var vAlign = this.wrapConfig.vAlign,
            hAlign = this.wrapConfig.hAlign;
        if ((vAlign === 1) || (vAlign === 'center') || (vAlign === 2) || (vAlign === 'bottom') ||
            (hAlign === 1) || (hAlign === 'center') || (hAlign === 2) || (hAlign === 'right')) {
            this.runWrap();
        }

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

    setNumberInput() {
        this.textEdit.setNumberInput();
        return this;
    }

}

export default CanvasInput;