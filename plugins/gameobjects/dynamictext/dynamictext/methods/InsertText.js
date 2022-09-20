import CreateCharBobArray from './utils/CreateCharBobArray.js';

var InsertText = function (index, text, style) {
    var bobArray = CreateCharBobArray.call(this, text, style);
    index = this.getCharDataIndex(index, true);
    this.addChild(bobArray, index);

    return this;
};

export default InsertText;