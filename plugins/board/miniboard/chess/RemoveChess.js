import SetSizeFromBounds from '../transform/SetSizeFromBounds.js';

var RemoveChess = function (gameObject, tileX, tileY, tileZ, destroy) {
    this.board.removeChess(gameObject, tileX, tileY, tileZ, destroy);
    SetSizeFromBounds.call(this);
    return this;
}

export default RemoveChess;