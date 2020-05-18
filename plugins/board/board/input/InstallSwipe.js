import Swipe from '../../../input/gestures/swipe/Swipe.js';
import EmitChessEvent from './EmitChessEvent.js';

var InstallSwipe = function () {
    var board = this.board;
    var swipe = new Swipe(board.scene);
    swipe
        .on('swipe', OnSwipe, this);

    return swipe;
}

var OnSwipe = function (swipe) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(swipe.worldX, swipe.worldY);
    var tileX = tileXY.x,
        tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    swipe.direction = board.angleSnapToDirection(tileXY, swipe.getVelocityAngle());

    board.emit('tileswipe', swipe, tileXY);

    EmitChessEvent(
        'gameobjectswipe',
        'board.swipe',
        board, tileX, tileY,
        swipe
    );
}

export default InstallSwipe;