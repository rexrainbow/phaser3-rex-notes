import BobPositionToWorldPosition from './BobPositionToWorldPosition.js';

var GetBobWorldPosition = function (bob, offsetX, offsetY, out) {
    if (typeof (offsetX) !== 'number') {
        out = offsetX;
        offsetX = 0;
        offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToWorldPosition.call(this, bob, bobX, bobY, out);
}

export default GetBobWorldPosition;