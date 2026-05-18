var GetNeighborTileXY = function(srcTileXY?: any, directions?: any, out?: any) {
    return this.getTileXYAtDirection(srcTileXY, directions, 1, out);
};

export default GetNeighborTileXY;