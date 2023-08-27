import CanvasPositionToBobPosition from '../../methods/utils/transform/CanvasPositionToBobPosition.js';
import GetBobBounds from './GetBobBounds.js';

var Contains = function (canvasX, canvasY) {
    if ((this.width === 0) || (this.height === 0)) {
        return false;
    }

    var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
    return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
}

export default Contains;