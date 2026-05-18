var TileXYToKey = function(tileX?: any, tileY?: any, separator?: any) {
    if (separator === undefined) {
        separator = ',';
    }
    return `${tileX}${separator}${tileY}`;
}
export default TileXYToKey;