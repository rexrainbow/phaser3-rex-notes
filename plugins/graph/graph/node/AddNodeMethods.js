import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

export default {
    addNode(gameObejct, attributes) {
        if (this.isNode(gameObejct)) {
            return this;
        }

        GetGraphItem(gameObejct).setGraph(this);

        var nodeUID = GetObjUID(gameObejct);
        this.graph.addNode(nodeUID, attributes);

        return this;
    },

    addNodes(gameObjects, attributes) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.addNode(gameObjects[i], { ...attributes });
        }
        return this;
    }
}