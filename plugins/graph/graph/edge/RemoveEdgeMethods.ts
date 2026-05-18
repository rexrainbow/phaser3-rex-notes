import GetGraphItem from '../../graphitem/GetGraphItem';
import GetObjUID from '../../graphitem/GetObjUID';

export default {
    removeEdge(edgeGameObject?: any, destroy?: any) {
        if (!this.isEdge(edgeGameObject)) {
            return this;
        }

        if (destroy === undefined) {
            destroy = false;
        }

        // Remove node
        var edgeUID = GetObjUID(edgeGameObject);
        this.graph.dropEdge(edgeUID);

        // Clear reference of graph
        GetGraphItem(edgeGameObject).setGraph(null);

        // Destroy game object
        if (destroy && edgeGameObject.destroy) {
            edgeGameObject.destroy();
        }

        return this;
    },

    removeAllEdges(destroy?: any) {
        for (var edgeUid in this.edges) {
            this.removeEdge(edgeUid, destroy)
        }

        return this;
    },
};