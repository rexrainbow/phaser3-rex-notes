var AppendText = function(value?: any, addCR?: any) {
    if (!value && value !== 0) {
        value = '';
    }

    if (addCR === undefined) {
        addCR = true;
    }

    if (Array.isArray(value)) {
        value = value.join('\n');
    }

    var newText;
    if (addCR?: any) {
        newText = `${this.text}\n${value}`;
    } else {
        newText = `${this.text}${value}`;
    }

    if (newText != this.text) {
        this.setText(newText);
    }

    return this;
}

export default AppendText;