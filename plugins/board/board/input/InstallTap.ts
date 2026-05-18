import Tap from '../../../input/gestures/tap/Tap';
import EmitChessEvent from './EmitChessEvent';

var InstallTap = function() {
    var touchZone = (this.touchZone) ? this.touchZone : this.board.scene;
    var tap = new Tap(touchZone);
    tap.on('tap', OnTap, this);
    return tap;
}

var OnTap = function(tap?: any) {
    var board = this.board;
    // Get touched tileX, tileY
    var tileXY = board.worldXYToTileXY(tap.worldX, tap.worldY);
    var tileX = tileXY.x,
        tileY = tileXY.y;
    if (!board.contains(tileX, tileY)) {
        return;
    }

    board.emit('tiletap', tap, tileXY);
    board.emit(`tile${tap.tapsCount}tap`, tap, tileXY);

    var boardEventCallback = function(gameObject?: any) {
        board.emit('gameobjecttap', tap, gameObject);
        board.emit(`gameobject${tap.tapsCount}tap`, tap, gameObject);
    }
    var chessEventCallback = function(gameObject?: any) {
        gameObject.emit('board.tap', tap);
        gameObject.emit(`board.${tap.tapsCount}tap`, tap);
    }
    EmitChessEvent(
        boardEventCallback,
        chessEventCallback,
        board, tileX, tileY, 
        tap
    );
}

export default InstallTap;