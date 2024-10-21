import GetObjUID from '../../graphitem/GetObjUID.js';

var GetEdgeAttribute = function (gameObject, key) {
    var nodeUID = GetObjUID(gameObject);

    if (key === undefined) {
        return this.graph.getEdgeAttributes(nodeUID);
    } else {
        return this.graph.getEdgeAttribute(nodeUID, key);
    }
}

export default GetEdgeAttribute;