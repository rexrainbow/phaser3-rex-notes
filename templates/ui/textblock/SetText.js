var SetText = function (text) {
    if (text !== undefined) {
        this.text = text;
    }

    // Wrap content in lines
    if (this.textObjectType === 0) {
        this.lines = this.textObject.getWrappedText(this.text); // lines in array
    } else {
        this.lines = this.textObject.getPenManager(this.text, this.lines); // pen manager
    }

    this.updateTextObject();
    return this;
}
export default SetText;