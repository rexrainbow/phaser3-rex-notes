import GetGraphItem from '../../graphitem/GetGraphItem';
import GetObjUID from '../../graphitem/GetObjUID';

export default {
    removeNode(nodeGameObject?: any, destroy?: any) {
        if (!this.isNode(nodeGameObject)) {
            return this;
        }

        if (destroy === undefined) {
            destroy = false;
        }

        // Remove node
        var nodeUID = GetObjUID(nodeGameObject);
        this.graph.dropNode(nodeUID);

        // Clear reference of graph
        GetGraphItem(nodeGameObject).setGraph(null);

        // Destroy game object
        if (destroy && nodeGameObject.destroy) {
            nodeGameObject.destroy();
        }

        return this;
    },

    removeAllNodes(destroy?: any) {
        for (var nodeUid in this.nodes) {
            this.removeNode(nodeUid, destroy)
        }

        return this;
    }
}