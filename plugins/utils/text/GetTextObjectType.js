import IsTextGameObject from './IsTextGameObject.js';
import IsBitmapTextGameObject from '../bitmaptext/IsBitmapTextGameObject.js';

export const TextType = 0;
export const TagTextType = 1;
export const BitmapTextType = 2;

var GetTextObjectType = function (textObject) {
    var textObjectType;
    if (IsBitmapTextGameObject(textObject)) {
        textObjectType = BitmapTextType;
    } else if (IsTextGameObject(textObject)) {
        textObjectType = TextType;
    } else {
        textObjectType = TagTextType;
    }

    return textObjectType;
}

export default GetTextObjectType;