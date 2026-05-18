import SetSizeFromBounds from '../transform/SetSizeFromBounds';

var RemoveChess = function(gameObject?: any, tileX?: any, tileY?: any, tileZ?: any, destroy?: any) {
    this.board.removeChess(gameObject, tileX, tileY, tileZ, destroy);
    SetSizeFromBounds.call(this);
    return this;
}

export default RemoveChess;