import IsTextGameObject from './IsTextGameObject';
import IsBitmapTextGameObject from '../bitmaptext/IsBitmapTextGameObject';

export const TextType = 0;
export const TagTextType = 1;
export const BitmapTextType = 2;

var GetTextObjectType = function(textObject?: any) {
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