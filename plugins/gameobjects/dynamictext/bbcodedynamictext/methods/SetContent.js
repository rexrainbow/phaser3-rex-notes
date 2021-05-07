import SetText from '../../dynamictext/methods/SetText.js';

var SetContent = function (content) {
    this.content = content;
    this.defaultTextStyle = this.textStyle.toJSON();

    SetText.call(this);  // Clear children

    this.parser.start(content); // Parse bbcode-content

    return this;
}

export default SetContent;