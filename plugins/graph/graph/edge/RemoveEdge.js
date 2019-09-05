import GetGraphItem from '../../graphitem/GetGraphItem.js';

var RemoveEdge = function (gameObejct, destroy) {
    if (destroy === undefined) {
        destroy = false;
    }

    var uid = this.getObjUID(gameObejct);
    if (!this.edges.hasOwnProperty(uid)) {
        return this;
    }

    // Remove edge
    delete this.edges[uid];
    // Clear reference of graph
    GetGraphItem(gameObejct).setGraph(null);
    if (destroy && gameObejct.destroy) {
        gameObject.destroy();
    }
    return this;
}

export default RemoveEdge;