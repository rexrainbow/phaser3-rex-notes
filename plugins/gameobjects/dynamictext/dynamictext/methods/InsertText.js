import CreateCharBobArray from './utils/CreateCharBobArray.js';
import { IsChar } from '../bob/Types.js';

var InsertText = function (index, text, style) {
    var bobArray = CreateCharBobArray.call(this, text, style);

    var textIndex = index;
    index = undefined;
    var children = this.children;
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        if (IsChar(children[i])) {
            if (textIndex === 0) {
                index = i;
                break;
            } else {
                textIndex--;
            }
        }
    }

    this.addChild(bobArray, index);

    return this;
};

export default InsertText;