var GetAllChess = function(out?: any) {
    if (out === undefined) {
        out = [];
    }
    var uids = this.boardData.UIDToXYZ;
    for (var uid in uids) {
        out.push(this.uidToChess(uid));
    }
    return out;
};
export default GetAllChess;