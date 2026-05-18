var GetCost = function(curTileXY?: any, preTileXY?: any) {
    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curTileXY, preTileXY, this);
    } else {
        return this.costCallback(curTileXY, preTileXY, this);
    }
}
export default GetCost;