import GetGraphItem from '../../graphitem/GetGraphItem.js';

var AddNode = function (gameObejct) {
    if (this.isNode(gameObejct)) {
        return this;
    }

    this.getNodeData(gameObejct, true);
    GetGraphItem(gameObejct).setGraph(this);
    this.nodeCount++;
    return this;
};

export default AddNode;