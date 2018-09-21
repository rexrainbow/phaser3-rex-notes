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

    this.aStarSearch(chess, null, movingPoints, AREA_MODE, function (nodeManager) {
        var nodes = nodeManager.getAllNodes(),
            node;
        for (var key in nodes) {
            node = nodes[key];
            out.push({
                x: node.x,
                y: node.y,
                cost: node.cost
            });
        }
    });
    return out;
}
export default GetArea;