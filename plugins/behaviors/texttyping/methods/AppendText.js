var AppendText = function (text) {
    var newText = this.text.concat(TransferText(text));
    if (this.isTyping) {
        this.setTypingContent(newText);
    } else {
        this.start(newText, undefined, this.textLen);
    }

    return this;
}

export default AppendText;