var IsOverlapping = function (mainBoard) {
    if (!mainBoard) {
        return false;
    }
    if (mainBoard.infinityMode) {
        return true;
    }

    var gameObject;
    for (var uid in this.tileXYZMap) {
        gameObject = this.board.uidToChess(uid);
        if (mainBoard.containPoint(gameObject.x, gameObject.y)) {
            return true;
        }
    }
    return false;
}
export default IsOverlapping;