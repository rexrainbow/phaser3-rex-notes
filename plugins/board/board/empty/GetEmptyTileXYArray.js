var GetEmptyTileXYArray = function (tileZ, out) {
    if (out === undefined) {
        out = [];
    }
    if (tileZ === undefined) {
        tileZ = 0;
    }
    for (var tileY = 0; tileY < this.height; tileY++) {
        for (var tileX = 0; tileX < this.width; tileX++) {
            if (this.tileXYZToChess(tileX, tileY, tileZ) === null) {
                out.push({
                    x: tileX,
                    y: tileY
                });
            }
        }
    }
    return out;
}
export default GetEmptyTileXYArray;