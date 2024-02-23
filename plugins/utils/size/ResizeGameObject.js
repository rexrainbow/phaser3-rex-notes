import HasResizeMethod from './HasResizeMethod.js';
import CanSetDisplaySize from './CanSetDisplaySize.js';

var ResizeGameObject = function (gameObject, newWidth, newHeight) {
    if (!gameObject || ((newWidth === undefined) && (newHeight === undefined))) {
        return;
    }

    if (HasResizeMethod(gameObject)) { // Has `resize`, or `setSize` method
        if (newWidth === undefined) {
            newWidth = gameObject.width;
        }
        if (newHeight === undefined) {
            newHeight = gameObject.height;
        }

        if (gameObject.resize) {
            gameObject.resize(newWidth, newHeight);
        } else {
            gameObject.setSize(newWidth, newHeight);
        }
    } else { // Set display width/height
        var canSetDisplaySize = CanSetDisplaySize(gameObject);
        if (newWidth !== undefined) {
            if (canSetDisplaySize) {
                gameObject.displayWidth = newWidth;
            } else {
                gameObject.scaleX = newWidth / gameObject.width;
            }
        }
        if (newHeight !== undefined) {
            if (canSetDisplaySize) {
                gameObject.displayHeight = newHeight;
            } else {
                gameObject.scaleY = newHeight / gameObject.height;
            }
        }
    }
}

export default ResizeGameObject;