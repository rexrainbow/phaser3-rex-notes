import DynamicTextClass from '../../dynamictext/DynamicText';
import IsBitmapTextGameObject from '../../../../plugins/utils/bitmaptext/IsBitmapTextGameObject';
import TextRunWidthWrap from './TextRunWidthWrap';
import DynamicTextRunWidthWrap from './DynamicTextRunWidthWrap';
import BitmapTextRunWidthWrap from './BitmapTextRunWidthWrap';
import GetSizerConfig from '../GetSizerConfig';

var IsDynamicTextGameObject = function(gameObject?: any) {
    return (gameObject instanceof DynamicTextClass);
}

var WrapExpandText = function(textObject?: any, minWidth?: any) {
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