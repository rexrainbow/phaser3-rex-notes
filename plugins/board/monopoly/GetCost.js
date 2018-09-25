var GetCost = function (curTile) {
    if (typeof (this.costCallback) === 'number') {
        return this.costCallback;
    }
    if (this.costCallbackScope) {
        return this.costCallback.call(this.costCallbackScope, curTile);
    } else {
        return this.costCallback(curTile);
    }
}
export default GetCost;