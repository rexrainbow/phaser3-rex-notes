import HiddenInputTextBase from '../../../dom/hiddeninputtext/HiddenInputTextBase.js';
import GetCharIndex from '../../dynamictext/methods/utils/GetCharIndex.js';

class HiddenInputText extends HiddenInputTextBase {
    constructor(textObject, config) {
        super(textObject, config);
        // this.textObject = textObject;

        // TODO: Set cursor
        textObject.on('child.pointerdown', function (child, pointer, localX, localY, event) {
            var childIndex = textObject.children.indexOf(child);
            var charIndex = GetCharIndex.call(textObject, childIndex);
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