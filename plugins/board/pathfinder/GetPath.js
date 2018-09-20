import GetChessData from '../chess/GetChessData.js';
import CONST from './const.js';

const PATH_MODE = CONST.PATH_MODE;
const NEAREST_PATH_MODE = CONST.NEAREST_PATH_MODE;

var GetPath = function (chess, endTileXY, movingPoints, isNearest, out) {
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

    var mode = (isNearest) ? NEAREST_PATH_MODE : PATH_MODE;
    var nodes = this.aStarSearch(chess, endTileXY, movingPoints, mode);
    if (nodes === null) {
        return out;
    }
    // TODO
}
export default GetPath;