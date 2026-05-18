import IsUID from '../../chess/IsUID';
import IsChess from '../../chess/IsChess';
import GetChessUID from '../../chess/GetChessUID';
import IsTileXYZ from '../../utils/IsTileXYZ';

var ChessToTileXYZ = function(chess?: any) {
    if (!chess) {
        return null;
    }

    // chess: chess object, UID, or tileXYZ
    if (IsUID(chess) || IsChess(chess)) { // UID, or game object
        var uid = GetChessUID(chess);
        return this.boardData.getXYZ(uid);
    } else if (IsTileXYZ(chess)) { // {x, y}, or {x, y, z}
        return chess;
    } else {
        return null;
    }
}
export default ChessToTileXYZ;