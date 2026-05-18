var TileXYToCost = function(tileX?: any, tileY?: any, pathCost?: any) {
    if (this.nodeManager === undefined) {
        return null;
    }
    var node = this.nodeManager.getNode(tileX, tileY);
    if (node === null) {
        return null;
    }
    if (pathCost === undefined) {
        pathCost = true;
    }
    return (pathCost)? node.g:node.cost;
}
export default TileXYToCost;