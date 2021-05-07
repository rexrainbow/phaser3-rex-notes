import AppendText from './AppendText.js';

var SetText = function (text, style) {
    if (text === undefined) {
        text = '';
    }

    var childrenLengthSave = this.children.length;

    this.removeChildren();
    AppendText.call(this, text, style);  // this.appendText might be override

    if (this.children.length !== childrenLengthSave) {
        this.dirty = true;
    }
    return this;
};

export default SetText;