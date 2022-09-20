import HiddenInputTextBase from '../../../dom/hiddeninputtext/HiddenInputTextBase.js';
import SetText from './SetText.js';

class HiddenInputText extends HiddenInputTextBase {
    constructor(textObject, config) {
        super(textObject, config);
        // this.textObject = textObject;
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

        SetText(this.textObject, text);

        return this;
    }
}

export default HiddenInputText;