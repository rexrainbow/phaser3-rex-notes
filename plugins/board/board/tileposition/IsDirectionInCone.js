var IsDirectionInCone = function (chessA, chessB, face, cone) {
    var tileXYA = this.chessToTileXYZ(chessA);
    var tileXYB = this.chessToTileXYZ(chessB);
    var direction = this.directionBetween(tileXYA, tileXYB, false);
    var deltaDirection = Math.abs(direction - face);
    deltaDirection = Math.min(deltaDirection, this.grid.directions - deltaDirection);
    return (deltaDirection <= (cone / 2));
}
export default IsDirectionInCone;