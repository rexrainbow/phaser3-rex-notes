import GetString from '../../../utils/text/GetString.js';

export default {
    setText(value) {
        this._text = GetString(value);

        this.updateText();

        return this;
    },

    appendText(value) {
        this.setText(this.text + GetString(value))

        return this;
    }

}