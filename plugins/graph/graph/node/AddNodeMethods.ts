import GetGraphItem from '../../graphitem/GetGraphItem';
import GetObjUID from '../../graphitem/GetObjUID';

export default {
    isNode(gameObejct?: any) {
        // uid or game object
        var uid = GetObjUID(gameObejct, false);
        if (uid === null) {
            return false;
        }

        return this.graph.hasNode(uid);
    },

    addNode(gameObejct?: any, attributes?: any, nodeUID?: any) {
        if (this.isNode(gameObejct)) {
            return this;
        }

        GetGraphItem(gameObejct, nodeUID).setGraph(this);

        if (nodeUID === undefined) {
            nodeUID = GetObjUID(gameObejct);
        }

        this.graph.addNode(nodeUID, attributes);

        return this;
    },

    addNodes(gameObjects?: any, attributes?: any) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            this.addNode(gameObjects[i], { ...attributes });
        }
        return this;
    },

}