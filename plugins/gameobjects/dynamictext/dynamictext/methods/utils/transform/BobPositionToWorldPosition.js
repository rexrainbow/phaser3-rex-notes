import BobPositionToCanvasPosition from './BobPositionToCanvasPosition.js';
import GameObjectLocalXYToWorldXY from '../../../../../../utils/position/GameObjectLocalXYToWorldXY.js';

var BobPositionToWorldPosition = function (bob, bobX, bobY, out) {
    var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
    var worldXY = GameObjectLocalXYToWorldXY(this, localXY.x, localXY.y, out);
    return worldXY;
}

export default BobPositionToWorldPosition;