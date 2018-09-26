var GetCost = function (curTileXY) {
    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curTileXY, this);
    } else {
        return this.costCallback(curTileXY, this);
    }
}
export default GetCost;