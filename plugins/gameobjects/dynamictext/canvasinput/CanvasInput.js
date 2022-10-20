import DynamicText from '../dynamictext/DynamicText.js';
import CreateHiddenTextEdit from './textedit/CreateHiddenTextEdit.js';
import RetrieveKeysByPrefix from './methods/RetrieveKeysByPrefix.js';
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

        var cursorStyle = RetrieveKeysByPrefix(config.style, 'cursor.');

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';

        this.textEdit = CreateHiddenTextEdit(this, config);

        if (config.cursorStyle) {
            Object.assign(cursorStyle, config.cursorStyle);
        }
        this.setCursorStyle(cursorStyle);

        var addCharCallback = config.onAddChar;
        if (addCharCallback) {
            this.on('addchar', addCharCallback);
        }

        if (this.cursorStyle) {
            this
                .on('cursorin', function (child, index, canvasInput) {
                    var curStyle = child.style;
                    var cursorStyle = this.cursorStyle;
                    var styleSave = {};
                    for (var name in cursorStyle) {
                        styleSave[name] = curStyle[name];
                    }
                    child.styleSave = styleSave;

                    child.modifyStyle(cursorStyle);
                })
                .on('cursorout', function (child, index, canvasInput) {
                    child.modifyStyle(child.styleSave);
                    child.styleSave = undefined;
                });
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

    setCursorStyle(style) {
        this.cursorStyle = style;
        return this;
    }
}

export default CanvasInput;