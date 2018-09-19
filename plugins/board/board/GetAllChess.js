import ChessBank from '../chess/ChessBank.js';

var GetAllChess = function (out) {
    if (out === undefined) {
        out = [];
    }
    var uids = ChessBank.refs;
    for (var uid in uids) {
        out.push(this.uidToChess(uid));
    }
    return out;
};
export default GetAllChess;