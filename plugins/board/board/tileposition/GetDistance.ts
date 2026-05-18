var GetDistance = function(tileA?: any, tileB?: any, roughMode?: any) {
    tileA = this.chessToTileXYZ(tileA);
    tileB = this.chessToTileXYZ(tileB);
    return this.grid.getDistance(tileA, tileB, roughMode);
}
export default GetDistance;