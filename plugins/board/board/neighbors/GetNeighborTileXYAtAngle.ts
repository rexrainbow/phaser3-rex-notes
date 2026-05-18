var GetNeighborTileXYAtAngle = function(srcTileXY?: any, angle?: any, out?: any) {
    var direction = this.angleSnapToDirection(srcTileXY, angle);
    return this.getTileXYAtDirection(srcTileXY, direction, 1, out);
};

export default GetNeighborTileXYAtAngle;