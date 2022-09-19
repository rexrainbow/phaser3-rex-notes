import HiddenInputTextBase from '../../dom/hiddeninputtext/HiddenInputTextBase.js';

class HiddenInputText extends HiddenInputTextBase {
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