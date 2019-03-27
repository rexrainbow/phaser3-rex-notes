var FindFOV = function (visiblePoints, out) {
    if (out === undefined) {
        out = [];
    }

    var board = this.board;
    var myTileXYZ = this.chessData.tileXYZ;
    var isAnyVisible, radius = 0,
        targetTileXY;
    do {
        isAnyVisible = false;
        radius++;
        board.ringToTileXYArray(myTileXYZ, radius, globRing);
        for (var i = 0, cnt = globRing.length; i < cnt; i++) {
            targetTileXY = globRing[i];
            if (this.isInLOS(targetTileXY, visiblePoints)) {
                isAnyVisible = true;
                out.push(targetTileXY);
            }
        }
        globRing.length = 0;
    } while (isAnyVisible)

    return out;
}

var globRing = [];

export default FindFOV;