import GetGraphItem from '../../graphitem/GetGraphItem.js';
import GetObjUID from '../../graphitem/GetObjUID.js';

export default {
    removeEdge(edgeGameObject, destroy) {
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

};