import BobPositionToCanvasPosition from './BobPositionToCanvasPosition.js';

var GetBobCenterPosition = function (bob, out) {
    return BobPositionToCanvasPosition(bob.drawCenterX, bob.drawCenterY, bob, out);
}

export default GetBobCenterPosition;