import Clone from '../../utils/object/Clone.js';
import Shuffle from '../../utils/array/Shuffle.js';

var MoveToRandomNeighbor = function () {
    var board = this.chessData.board;
    if (board === null) { // chess is not in a board
        this.lastMoveResult = false;
        return this;
    }

    var directions = board.grid.allDirections;
    if (tmpDirections.length !== directions.length) {
        Clone(directions, tmpDirections);
    }
    Shuffle(tmpDirections);
    for (var i = 0, cnt = tmpDirections.length; i < cnt; i++) {
        this.moveToward(tmpDirections[i]);
        if (this.lastMoveResult) {
            return this;
        }
    }
    return this;
}

var tmpDirections = [];
export default MoveToRandomNeighbor;