import SetSizeFromBounds from '../transform/SetSizeFromBounds.js';

var RemoveAllChess = function (destroy) {
    this.board.removeAllChess(destroy);
    SetSizeFromBounds.call(this);
    return this;
}

export default RemoveAllChess;