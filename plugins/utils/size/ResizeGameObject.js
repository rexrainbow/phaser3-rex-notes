import HasResizeMethod from './HasResizeMethod.js';
import CanSetDisplaySize from './CanSetDisplaySize.js';

var ResizeGameObject = function (gameObject, newDisplayWidth, newDisplayHeight) {
    // Set display size

    if (!gameObject || ((newDisplayWidth === undefined) && (newDisplayHeight === undefined))) {
        return;
    }

    if (HasResizeMethod(gameObject)) { // Has `resize`, or `setSize` method
        var newWidth, newHeight;
        if (newDisplayWidth === undefined) {
            newWidth = gameObject.width;
        } else {
            newWidth = newDisplayWidth / gameObject.scaleX;
        }
        if (newDisplayHeight === undefined) {
            newHeight = gameObject.height;
        } else {
            newHeight = newDisplayHeight / gameObject.scaleY;
        }

        if (gameObject.resize) {
            gameObject.resize(newWidth, newHeight);
        } else {
            gameObject.setSize(newWidth, newHeight);
        }

    } else {
        var canSetDisplaySize = CanSetDisplaySize(gameObject);
        if (newDisplayWidth !== undefined) {
            if (canSetDisplaySize) {
                gameObject.displayWidth = newDisplayWidth;
            } else {
                gameObject.scaleX = newDisplayWidth / gameObject.width;
            }
        }
        if (newDisplayHeight !== undefined) {
            if (canSetDisplaySize) {
                gameObject.displayHeight = newDisplayHeight;
            } else {
                gameObject.scaleY = newDisplayHeight / gameObject.height;
            }
        }

    }
}

export default ResizeGameObject;