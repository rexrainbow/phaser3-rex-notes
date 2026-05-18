var GetNeighborChessDirection = function(chess?: any, neighborChess?: any) {
    var srcTileXYZ = this.chessToTileXYZ(chess);
    var neighborTileXYZ = this.chessToTileXYZ(neighborChess);
    return this.getNeighborTileDirection(srcTileXYZ, neighborTileXYZ);
}
export default GetNeighborChessDirection;