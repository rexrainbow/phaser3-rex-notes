import HiddenTextEditBase from '../../../../behaviors/hiddentextedit/HiddenTextEditBase.js';
import NumberInputUpdateCallback from '../../../../behaviors/hiddentextedit/defaultcallbacks/NumberInputUpdateCallback.js';
import OnSelectRange from './OnSelectRange.js';
import OnMoveCursor from './OnMoveCursor.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HiddenTextEdit extends HiddenTextEditBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.setSelectAllWhenFocusEnable(GetValue(config, 'selectAll', false));

        this.cursorMoveStartIndex = null;
        this.prevCursorPosition = null;
        this.prevSelectionStart = null;
        this.prevSelectionEnd = null;
        this.firstClickAfterOpen = false;


        gameObject
            // Open editor by 'pointerdown' event
            // Then set cursor position to nearest char
            .on('pointerdown', function (pointer, localX, localY, event) {
                var child = gameObject.getNearestChild(localX, localY);
                var charIndex = gameObject.getCharIndex(child);

                if (!this.selectAllWhenFocus || !this.firstClickAfterOpen) {
                    this.setCursorPosition(charIndex);
                }

                this.cursorMoveStartIndex = charIndex;
                this.firstClickAfterOpen = false;
            }, this)
            .on('pointermove', function (pointer, localX, localY, event) {
                if (!pointer.isDown) {
                    return;
                }
                var child = gameObject.getNearestChild(localX, localY);
                var charIndex = gameObject.getCharIndex(child);
                if (this.cursorMoveStartIndex < charIndex) {
                    this.selectText(this.cursorMoveStartIndex, charIndex);
                } else {
                    this.selectText(charIndex, this.cursorMoveStartIndex);
                }
            }, this)

        this
            .on('open', function () {
                if (this.selectAllWhenFocus) {
                    this.selectAll();
                }
                this.firstClickAfterOpen = true;

                gameObject.emit('open');
            }, this)
            .on('close', function () {
                gameObject.emit('close');
            }, this)
    }

    initText() {
        var textObject = this.parent;
        this.prevCursorPosition = null;
        this.setText(textObject.text);
        return this;
    }

    updateText() {
        var textObject = this.parent;

        var text = this.text;
        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, textObject, this);
            if (newText != null) {
                text = newText;
            }
        }

        if (textObject.text !== text) {
            textObject.setText(text);
            textObject.emit('textchange', text, textObject, this);
        }

        var selectionStart = (this.isOpened) ? this.selectionStart : null;
        var selectionEnd = (this.isOpened) ? this.selectionEnd : null;
        var prevSelectionStart = this.prevSelectionStart;
        var prevSelectionEnd = this.prevSelectionEnd;

        var isPrevSelectRange = (prevSelectionStart !== prevSelectionEnd);
        var isSelectRange = (selectionStart !== selectionEnd);
        var isSelectRangeChanged = (isPrevSelectRange || isSelectRange) &&
            ((prevSelectionStart !== selectionStart) || (prevSelectionEnd !== selectionEnd));

        if (isSelectRangeChanged) {
            // console.log(prevSelectionStart, prevSelectionEnd, selectionStart, selectionEnd)
            OnSelectRange(this);
        } else if (!isSelectRange) {
            this.prevSelectionStart = null;
            this.prevSelectionEnd = null;
            OnMoveCursor(this);
        }

        return this;
    }

    setNumberInput() {
        this.onUpdateCallback = NumberInputUpdateCallback;
        return this;
    }

    setSelectAllWhenFocusEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.selectAllWhenFocus = enable;
        return this;
    }
}

export default HiddenTextEdit;