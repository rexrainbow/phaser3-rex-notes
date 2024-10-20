import GetGraphItem from '../graphitem/GetGraphItem.js';

var AddNode = function (gameObejct) {
    if (this.isNode(gameObejct)) {
        return this;
    }

    GetGraphItem(gameObejct).setGraph(this);

    var nodeUID = this.getObjUID(gameObejct);
    this.graph.addNode(nodeUID);

    return this;
};

export default AddNode;