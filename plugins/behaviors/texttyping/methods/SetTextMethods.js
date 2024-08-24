import GetString from '../../../utils/text/GetString.js';
import SetNoWrapText from '../../../utils/text/SetNoWrapText.js';

export default {
    setText(text) {
        if (this.setTextCallback) {
            if (this.setTextCallbackScope) {
                text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIndex);
            } else {
                text = this.setTextCallback(text, this.isLastChar, this.insertIndex);
            }
        }

        if (this.textWrapEnable) {
            SetNoWrapText(this.parent, text);
        } else {
            this.parent.setText(text);
        }
    },

    appendText(text) {
        var newText = this.text.concat(GetString(text));
        if (this.isTyping) {
            this.setTypingContent(newText);
        } else {
            this.start(newText, undefined, this.textLength);
        }

        return this;
    }

}