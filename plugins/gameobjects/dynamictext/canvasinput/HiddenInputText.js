import HiddenInputTextBase from '../../dom/hiddeninputtext/HiddenInputTextBase.js';

class HiddenInputText extends HiddenInputTextBase {
    constructor(textObject, config) {
        super(textObject, config);
        // this.textObject = textObject;
    }

    initText() {
        this.setText(this.getParentText());

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

        this.setParentText(text);

        return this;
    }

    getParentText() {
        return this.textObject.text;
    }

    setParentText(newText) {
        var text = this.getParentText();
        if (newText === text) {
            return this;
        }

        this.textObject.setText(newText)

        this.textObject.runWordWrap();

        return this;

    }
}

export default HiddenInputText;