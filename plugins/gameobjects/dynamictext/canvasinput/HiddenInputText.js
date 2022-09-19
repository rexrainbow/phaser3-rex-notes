import HiddenInputTextBase from '../../dom/hiddeninputtext/HiddenInputTextBase.js';

class HiddenInputText extends HiddenInputTextBase {
    constructor(textObject, config) {
        if (config === undefined) {
            config = {};
        }
        config.updateTextMode = 1;
        super(textObject, config);
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

        if (text !== this.textObject.text) {
            this.textObject
                .setText(text)
                .runWordWrap()
        }

        return this;
    }
}

export default HiddenInputText;