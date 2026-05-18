import SetSizeFromBounds from '../transform/SetSizeFromBounds';

var RemoveAllChess = function(destroy?: any) {
    this.board.removeAllChess(destroy);
    SetSizeFromBounds.call(this);
    return this;
}

export default RemoveAllChess;