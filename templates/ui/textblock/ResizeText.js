import IsTextGameObject from '../../../plugins/utils/text/IsTextGameObject.js';
import FullFillTextGameObject from '../../../plugins/utils/text/FullFill.js';
// import IsCanvasTextGameObject from '../../../plugins/utils/canvastext/IsCanvasTextGameObject.js';
import FullFillCanvasTextGameObject from '../../../plugins/utils/canvastext/FullFill.js';

var ResizeText = function (textObject, width, height) {
    if (IsTextGameObject(textObject)) {
        FullFillTextGameObject(textObject, width, height);
    } else {
        FullFillCanvasTextGameObject(textObject, width, height);
    }
}

export default ResizeText;