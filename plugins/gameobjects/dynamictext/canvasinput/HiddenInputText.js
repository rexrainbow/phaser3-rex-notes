import HiddenInputTextBase from '../../dom/hiddeninputtext/HiddenInputTextBase.js';
import { diffChars as DiffChars } from 'diff';

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

        var results = DiffChars(text, newText);
        var charIndex = 0;
        for (var i = 0, cnt = results.length; i < cnt; i++) {
            var result = results[i];
            if (result.removed) {
                // Remove character at charIndex
                this.textObject.removeText(charIndex, result.count);
            } else if (result.added) {
                this.textObject.insertText(charIndex, result.value);
                charIndex += result.count;
            } else {
                charIndex += result.count;
            }
        }

        // this.textObject.setText(newText);

        this.textObject.runWordWrap();

        return this;

    }
}

export default HiddenInputText;