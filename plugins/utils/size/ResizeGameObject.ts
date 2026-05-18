import HasResizeMethod from './HasResizeMethod';
import CanSetDisplaySize from './CanSetDisplaySize';

var ResizeGameObject = function(gameObject?: any, newDisplayWidth?: any, newDisplayHeight?: any) {
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
            if (canSetDisplaySize?: any) {
                gameObject.displayWidth = newDisplayWidth;
            } else {
                gameObject.scaleX = newDisplayWidth / gameObject.width;
            }
        }
        if (newDisplayHeight !== undefined) {
            if (canSetDisplaySize?: any) {
                gameObject.displayHeight = newDisplayHeight;
            } else {
                gameObject.scaleY = newDisplayHeight / gameObject.height;
            }
        }

    }
}

export default ResizeGameObject;