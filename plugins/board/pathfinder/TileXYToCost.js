var TileXYToCost = function (tileX, tileY, pathCost) {
    if (this.nodesManager === undefined) {
        return null;
    }
    var node = this.nodesManager.getNode(tileX, tileY);
    if (node === null) {
        return null;
    }
    if (pathCost === undefined) {
        pathCost = true;
    }
    return (pathCost)? node.g:node.cost;
}
export default TileXYToCost;