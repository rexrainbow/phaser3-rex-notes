import GetTileXAtDirection from './GetTileXYAtDirection';

var GetNeighborTileXY = function(tileX?: any, tileY?: any, direction?: any, out?: any) {
    return GetTileXAtDirection.call(this, tileX, tileY, direction, 1, out);
};

export default GetNeighborTileXY;