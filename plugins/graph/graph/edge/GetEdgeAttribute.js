import GetObjUID from '../../graphitem/GetObjUID.js';

var GetEdgeAttribute = function (gameObject, key) {
    var edgeUID = GetObjUID(gameObject);

    if (key === undefined) {
        return this.graph.getEdgeAttributes(edgeUID);
    } else {
        return this.graph.getEdgeAttribute(edgeUID, key);
    }
}

export default GetEdgeAttribute;