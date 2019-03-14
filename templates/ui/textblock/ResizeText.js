import IsTextGameObject from '../../../plugins/utils/text/IsTextGameObject.js';
import FullFillTextGameObject from '../../../plugins/utils/text/FullFill.js';

var ResizeText = function (textObject, width, height) {
    if (IsTextGameObject(textObject)) {
        FullFillTextGameObject(textObject, width, height)
    }
}

export default ResizeText;