import TextRunWidthWrap from './TextRunWidthWrap.js';
import BitmapTextRunWidthWrap from './BitmapTextRunWidthWrap.js';
import IsBitmapTextGameObject from '../../../../plugins/utils/bitmaptext/IsBitmapTextGameObject.js';

var WrapExpandText = function (textObject, minWidth) {
    if (minWidth === undefined) {
        minWidth = 0;
    }

    textObject.minWidth = minWidth;

    textObject.runWidthWrap = IsBitmapTextGameObject(textObject) ? BitmapTextRunWidthWrap(textObject) :
        TextRunWidthWrap(textObject);

    return textObject;
}

export default WrapExpandText;