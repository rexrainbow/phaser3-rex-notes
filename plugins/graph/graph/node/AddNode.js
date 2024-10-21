import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

var AddNode = function (gameObejct, attributes) {
    if (this.isNode(gameObejct)) {
        return this;
    }

    GetGraphItem(gameObejct).setGraph(this);

    var nodeUID = GetObjUID(gameObejct);
    this.graph.addNode(nodeUID, attributes);

    return this;
};

export default AddNode;