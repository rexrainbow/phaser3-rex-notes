import HiddenTextEditBase from '../../../../behaviors/hiddentextedit/HiddenTextEditBase.js';

class HiddenTextEdit extends HiddenTextEditBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        gameObject
            // Open editor by 'pointerdown' event
            // Then set cursor position to nearest char
            .on('pointerdown', function (pointer, localX, localY, event) {
                var child = gameObject.getNearestChild(localX, localY);
                var charIndex = gameObject.getCharIndex(child);
                this.setCursorPosition(charIndex);
            }, this)

        this
            .on('open', function () {
                gameObject.emit('open');
            })
            .on('close', function () {
                gameObject.emit('close');
            })
    }

    initText() {
        var textObject = this.parent;
        this.prevCursorPosition = undefined;
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

        textObject.setText(text);

        var cursorPosition = (this.isOpened) ? this.cursorPosition : null;
        if (this.prevCursorPosition !== cursorPosition) {
            textObject.emit('movecursor', cursorPosition, this.prevCursorPosition, textObject);
            this.prevCursorPosition = cursorPosition;
        }

        return this;
    }
}

export default HiddenTextEdit;