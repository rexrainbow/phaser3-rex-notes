import GetString from '../../../utils/text/GetString';

export default {
    setText(value?: any) {
        this._text = GetString(value);

        this.updateText();

        return this;
    },

    appendText(value?: any) {
        this.setText(this.text + GetString(value))

        return this;
    }

}