import TileXYToKey from '../utils/tilexyzkey/TileXYToKey.js';
var TileXYToCost = function (tileX, tileY) {
    var key = TileXYToKey(tileX, tileY);
    if (!this.costCache.hasOwnProperty(key)) {
        return null;
    }
    return this.costCache[key];
}
export default TileXYToCost;