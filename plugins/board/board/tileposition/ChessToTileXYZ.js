import IsUID from '../../chess/IsUID.js';
import IsChess from '../../chess/IsChess';
import IsTileXY from '../../utils/IsTileXY.js';

var ChessToTileXYZ = function (chess) {
    // chess: chess object, UID, or tileXYZ
    if (IsChess(chess)) { // chess
        var chessData = chess.rexChess;
        if (chessData.board === this) {
            return chessData.tileXYZ;
        } else {
            return null;
        }
    } else if (IsUID(chess)) { // UID
        var uid = chess;
        return this.boardData.getXYZ(uid);
    } else if (IsTileXY(chess)) { // {x, y}, or {x, y, z}
        var tileXYZ = chess;
        return tileXYZ;
    } else {
        return null;
    }
}
export default ChessToTileXYZ;