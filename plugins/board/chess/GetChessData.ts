import ChessBank from './ChessBank';
import ChessData from './ChessData';
import IsUID from './IsUID';

var GetChessData = function(gameObject?: any) {
    // game object or uid
    if (IsUID(gameObject)) {
        // uid
        return ChessBank.get(gameObject);
    } else {
        // game object
        if (!gameObject.hasOwnProperty('rexChess') || !gameObject.rexChess) {
            gameObject.rexChess = new ChessData(gameObject);
        }
        return gameObject.rexChess;
    }
}
export default GetChessData;