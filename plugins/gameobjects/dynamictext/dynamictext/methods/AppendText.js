import CreateCharBobArray from './utils/CreateCharBobArray.js';

var AppendText = function (text, style) {
    var bobArray = CreateCharBobArray.call(this, text, style);
    this.addChild(bobArray);
    return this;
};

export default AppendText;