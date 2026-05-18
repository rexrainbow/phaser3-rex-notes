import AppendText from './AppendText';

var SetText = function(text?: any, style?: any) {
    if (text === undefined) {
        text = '';
    }

    this.removeChildren();
    AppendText.call(this, text, style);  // this.appendText might be override

    this.dirty = true;
    return this;
};

export default SetText;