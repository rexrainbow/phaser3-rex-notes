var RemoveAllChess = function () {
    var chess = this.getAllChess();
    for (var i = 0, cnt = chess.length; i < cnt; i++) {
        this.RemoveChess(chess[i], undefined, undefined, undefined, true);
    }
    return this;
}
export default RemoveAllChess;