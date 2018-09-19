import GetChessData from './GetChessData.js';
import ChessBank from './ChessBank.js';

const uidKey = ChessBank.uidKey;
var GetChessUID = function (gameObject) {
    // game object or uid
    var uid;
    var type = typeof (gameObject);
    if ((type === 'number') || (type === 'string')) {
        uid = gameObject;
    } else {
        uid = GetChessData(gameObject)[uidKey];
    }
    return uid;
}
export default GetChessUID;