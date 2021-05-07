var SetText = function (text) {
    this.removeChildren();

    this.content = text;
    this.parser.start(text); // Parse bbcode-content

    return this;
}

export default SetText;