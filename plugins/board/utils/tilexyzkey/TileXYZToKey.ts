var TileXYZToKey = function(tileX?: any, tileY?: any, tileZ?: any, separator?: any) {
    if (separator === undefined) {
        separator = ',';
    }
    return `${tileX}${separator}${tileY}${separator}${tileZ}`;
}
export default TileXYZToKey;