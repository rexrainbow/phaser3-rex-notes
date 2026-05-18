import BobPositionToCanvasPosition from './BobPositionToCanvasPosition';

var GetBobCenterPosition = function(bob?: any, offsetX?: any, offsetY?: any, out?: any) {
    if (typeof (offsetX) !== 'number') {
        out = offsetX;
        offsetX = 0;
        offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToCanvasPosition(bob, bobX, bobY, out);
}

export default GetBobCenterPosition;