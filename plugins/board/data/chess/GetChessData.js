import ChessBank from './ChessBank.js';
import ChessData from './ChessData.js';

var GetChessData = function (gameObject) {
    // game object or uid
    var type = typeof (gameObject);
    if ((type === 'number') || (type === 'string')) {
        // uid
        var uid = gameObject;
        return ChessBank.get(uid);
    } else {
        // game object
        if (!gameObject.hasOwnProperty('rexChess')) {
            gameObject.rexChess = new ChessData(gameObject);
        }
        return gameObject.rexChess;
    }
}
export default GetChessData;