import BobPositionToWorldPosition from './BobPositionToWorldPosition';

var GetBobWorldPosition = function(dynamicText?: any, bob?: any, offsetX?: any, offsetY?: any, out?: any) {
    if (typeof (offsetX) !== 'number') {
        out = offsetX;
        offsetX = 0;
        offsetY = 0;
    }
    var bobX = bob.drawCenterX + offsetX;
    var bobY = bob.drawCenterY + offsetY;
    return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
}

export default GetBobWorldPosition;