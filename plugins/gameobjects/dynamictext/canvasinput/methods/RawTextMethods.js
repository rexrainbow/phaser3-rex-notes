export default {
    setRawText(value) {
        if (value == null) {
            this.clearRawText();
            return this;
        }

        value = value.toString();
        this._rawText = value;
        this.isDisplayTextSeparated = true;
        if (this.isOpened) {
            this.textEdit
                .setText(value)
                .updateText();
        }
        return this;
    },

    clearRawText() {
        this._rawText = undefined;
        this.isDisplayTextSeparated = false;
        if (this.isOpened) {
            this.textEdit
                .setText(this.text)
                .updateText();
        }
        return this;
    },

    getRawText() {
        return (this.isDisplayTextSeparated) ? this._rawText : this.text;
    },

    // Internal use
    updateRawText(value) {
        if (!this.isDisplayTextSeparated) {
            return this;
        }

        value = value.toString();
        this._rawText = value;
        return this;
    }
}
