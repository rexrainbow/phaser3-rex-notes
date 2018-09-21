import GetChessData from '../chess/GetChessData.js';
import CONST from './const.js';

const PATH_MODE = CONST.PATH_MODE;
const NEAREST_PATH_MODE = CONST.NEAREST_PATH_MODE;

var GetPath = function (chess, endTileXY, movingPoints, isClosest, out) {
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

    var mode = (isClosest) ? NEAREST_PATH_MODE : PATH_MODE;
    this.aStarSearch(chess, endTileXY, movingPoints, mode, function (nodeManager, closestNode) {
        var startTileXYZ = chessData.tileXYZ;
        var startNode = nodeManager.getNode(startTileXYZ, false);
        var endNode = (isClosest) ? closestNode : nodeManager.getNode(endTileXY, false);
        if (endNode === null) {
            return;
        }
        // TODO
        // endNode.pathTo(startNode, out);
    });
    return out;
}
export default GetPath;