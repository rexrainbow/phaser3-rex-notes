import CreateCharBobArray from './utils/CreateCharBobArray.js';
import GetCharDataIndex from './utils/GetCharDataIndex.js';

var InsertText = function (index, text, style) {
    var bobArray = CreateCharBobArray.call(this, text, style);
    index = GetCharDataIndex.call(this, index, true);
    this.addChild(bobArray, index);

    return this;
};

export default InsertText;