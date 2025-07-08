import DynamicTextClass from '../../dynamictext/DynamicText.js';
import IsBitmapTextGameObject from '../../../../plugins/utils/bitmaptext/IsBitmapTextGameObject.js';
import TextRunWidthWrap from './TextRunWidthWrap.js';
import DynamicTextRunWidthWrap from './DynamicTextRunWidthWrap.js';
import BitmapTextRunWidthWrap from './BitmapTextRunWidthWrap.js';
import GetSizerConfig from '../GetSizerConfig.js';

var IsDynamicTextGameObject = function (gameObject) {
    return (gameObject instanceof DynamicTextClass);
}

var WrapExpandText = function (textObject, minWidth) {
    if (minWidth === undefined) {
        minWidth = 0;
    }

    textObject._minWidth = minWidth;

    if (IsDynamicTextGameObject(textObject)) {
        textObject.runWidthWrap = DynamicTextRunWidthWrap(textObject);

    } else if (IsBitmapTextGameObject(textObject)) {
        textObject.runWidthWrap = BitmapTextRunWidthWrap(textObject);
        GetSizerConfig(textObject).noResize = true;

    } else {
        textObject.runWidthWrap = TextRunWidthWrap(textObject);

    }

    return textObject;
}

export default WrapExpandText;