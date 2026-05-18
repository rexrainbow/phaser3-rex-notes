import GetChessData from './GetChessData';
import ChessBank from './ChessBank';
import IsUID from './IsUID';

const uidKey = ChessBank.uidKey;
var GetChessUID = function(gameObject?: any) {
    // Game object or uid
    var uid;
    if (IsUID(gameObject)) {
        uid = gameObject;
    } else {
        uid = GetChessData(gameObject)[uidKey];
    }
    return uid;
}
export default GetChessUID;