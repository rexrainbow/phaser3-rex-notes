var TileXYToCost = function (tileX, tileY) {
    if (this.nodesManager === undefined) {
        return null;
    }
    var node = this.nodesManager.getNode(tileX, tileY);
    if (node === null) {
        return null;
    }
    return node.cost;
}
export default TileXYToCost;