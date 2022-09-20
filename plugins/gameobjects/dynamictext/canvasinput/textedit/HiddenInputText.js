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

        return this;
    }
}

export default HiddenInputText;