import HiddenTextEditBase from '../../../../behaviors/hiddentextedit/HiddenTextEditBase.js';
import NumberInputUpdateCallback from '../../../../behaviors/hiddentextedit/defaultcallbacks/NumberInputUpdateCallback.js';
import SelectRange from './SelectRange.js';
import MoveCursor from './MoveCursor.js';
import ClearSelectRange from './ClearSelectRange.js';
import ClearCursor from './ClearCursor.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

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
        this.requestCursorPosition = null;


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
                    this.selectText(this.cursorMoveStartIndex, charIndex + 1);
                } else {
                    this.selectText(charIndex, this.cursorMoveStartIndex + 1);
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
                // Route 'close' event
                gameObject.emit('close');
            })
            .on('keydown-ENTER', function () {
                // Route 'keydown-ENTER' event
                gameObject.emit('keydown-ENTER');
            })

    }

    initText() {
        var textObject = this.parent;
        this.prevCursorPosition = null;
        this.setText(textObject.rawText);
        return this;
    }

    // Invoking under 'postupdate' event of scene
    updateText() {
        this.updateRawText();

        this.updateDisplayText();

        this.updateCursor();

        return this;
    }

    updateRawText() {
        var textObject = this.parent;

        textObject.updateRawText(this.text);  // Update raw text from input

        return this;
    }

    updateDisplayText(text) {
        var textObject = this.parent;

        if (!text) {
            text = this.text;  // input text
        }

        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, textObject, this);
            if (newText != null) {
                text = newText;
            }
        }

        if (textObject.text !== text) {
            textObject.setText(text);  // Set display text
        }

        return this;
    }

    updateCursor() {
        if (this.isOpened) {
            if (this.selectionStart !== this.selectionEnd) {
                ClearCursor(this);
                SelectRange(this);
            } else {
                ClearSelectRange(this);
                MoveCursor(this);
            }
        } else {
            ClearSelectRange(this);
            ClearCursor(this);
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

    setRequestCursorPosition(value) {
        if (!this.isOpened) {
            return this;
        }

        this.requestCursorPosition = value;
        return this;
    }
}

export default HiddenTextEdit;