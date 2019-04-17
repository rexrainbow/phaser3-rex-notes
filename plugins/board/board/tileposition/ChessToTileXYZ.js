import IsUID from '../../chess/IsUID.js';
import IsChess from '../../chess/IsChess';
import GetChessUID from '../../chess/GetChessUID.js';
import IsTileXY from '../../utils/IsTileXY.js';

var ChessToTileXYZ = function (chess) {
    // chess: chess object, UID, or tileXYZ
    if (IsUID(chess) || IsChess(chess)) { // UID, or game object
        var uid = GetChessUID(chess);
        return this.boardData.getXYZ(uid);
    } else if (IsTileXY(chess)) { // {x, y}, or {x, y, z}
        var tileXYZ = chess;
        return tileXYZ;
    } else {
        return null;
    }
}
export default ChessToTileXYZ;