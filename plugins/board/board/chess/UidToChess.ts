import ChessBank from '../../chess/ChessBank';

var UidToChess = function(uid?: any) {
    if (uid == null) {
        return null;
    } else {
        if (!this.boardData.exists(uid)) {
            return null;
        }
        return ChessBank.get(uid).parent;
    }
}
export default UidToChess;