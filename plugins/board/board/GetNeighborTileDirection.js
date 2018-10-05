var GetNeighborTileDirection = function (srcTileXY, neighborTileXY) {
    if ((srcTileXY === null) || (neighborTileXY === null)) {
        return null;
    }
    if (this.tileXYIsEqual(srcTileXY, neighborTileXY)) {
        return null;
    }
    var direction = this.grid.getNeighborTileDirection(srcTileXY, neighborTileXY);
    if (this.wrapMode && (direction === null)) {
        tmpNeighborTileXYArray = this.getNeighborTileXY(srcTileXY, null, tmpNeighborTileXYArray);
        for (var i = 0, cnt = tmpNeighborTileXYArray.length; i < cnt; i++) {
            if (this.tileXYIsEqual(neighborTileXY, tmpNeighborTileXYArray[i])) {
                direction = i;
                break;
            }
        }
        tmpNeighborTileXYArray.length = 0;
    }
    return direction;
}

var tmpNeighborTileXYArray = [];

export default GetNeighborTileDirection;