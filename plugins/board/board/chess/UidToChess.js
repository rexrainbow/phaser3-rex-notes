import ChessBank from '../../chess/ChessBank.js';

var UidToChess = function (uid) {
    if (uid == null) {
        return null;
    } else {
        if (!this.boardData.exists(uid)) {
            return null;
        }
        var chessData = ChessBank.get(uid);
        if (chessData) {
            return chessData.parent;
        } else {
            return null;
        }
    }
}
export default UidToChess;