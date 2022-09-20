import HiddenInputTextBase from '../../../dom/hiddeninputtext/HiddenInputTextBase.js';

class HiddenInputText extends HiddenInputTextBase {
    constructor(textObject, config) {
        super(textObject, config);
        // this.textObject = textObject;

        textObject
            .on('child.pointerdown', function (child, childIndex, pointer, localX, localY, event) {
                var charIndex = textObject.getCharIndex(childIndex);
                this.setCursorPosition(charIndex);
            }, this);

    }

    initText() {
        this.prevCursorPosition = undefined;
        this.setText(this.textObject.text);

        return this;
    }

    updateText() {
        var text = this.text;

        if (this.onUpdateCallback) {
            var newText = this.onUpdateCallback(text, this.textObject, this);
            if (newText != null) {
                text = newText;
            }
        }

        this.textObject.setText(text);

        var cursorPosition = this.cursorPosition;
        if (this.prevCursorPosition !== cursorPosition) {
            this.textObject.emit('movecursor', cursorPosition, this.textObject);
            this.prevCursorPosition = cursorPosition;
        }

        return this;
    }
}

export default HiddenInputText;