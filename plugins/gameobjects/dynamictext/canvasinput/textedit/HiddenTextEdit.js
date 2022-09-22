import HiddenTextEditBase from '../../../../behaviors/hiddentextedit/HiddenTextEditBase.js';

class HiddenTextEdit extends HiddenTextEditBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        gameObject
            .on('child.pointerdown', function (child, childIndex, pointer, localX, localY, event) {
                var charIndex = gameObject.getCharIndex(childIndex);
                this.setCursorPosition(charIndex);
            }, this);

    }

    initText() {
        this.prevCursorPosition = undefined;
        this.setText(this.parent.text);

        return this;
    }

    updateText() {
        var text = this.text;

        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, this.parent, this);
            if (newText != null) {
                text = newText;
            }
        }

        this.parent.setText(text);

        var cursorPosition = this.cursorPosition;
        if (this.prevCursorPosition !== cursorPosition) {
            this.parent.emit('movecursor', cursorPosition, this.parent);
            this.prevCursorPosition = cursorPosition;
        }

        return this;
    }
}

export default HiddenTextEdit;