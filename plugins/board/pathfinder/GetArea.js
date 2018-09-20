import GetChessData from '../chess/GetChessData.js';
import CONST from './const.js';

const AREA_MODE = CONST.AREA_MODE;

var GetArea = function (chess, movingPoints, out) {
    if (out === undefined) {
        out = [];
    }
    if (movingPoints <= 0) {
        return out;
    }
    var chessData = GetChessData(chess);
    var board = chessData.board;
    if (board === null) { // chess is not in board
        return out;
    }

    var nodes = this.aStarSearch(chess, null, movingPoints, AREA_MODE);
    if (nodes === null) {
        return out;
    }
    // TODO
}
export default GetArea;