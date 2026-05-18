import BobPositionToCanvasPosition from './BobPositionToCanvasPosition';
import GameObjectLocalXYToWorldXY from '../../../../../../utils/position/GameObjectLocalXYToWorldXY';

var BobPositionToWorldPosition = function(dynamicText?: any, bob?: any, bobX?: any, bobY?: any, out?: any) {
    var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
    var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
    return worldXY;
}

export default BobPositionToWorldPosition;