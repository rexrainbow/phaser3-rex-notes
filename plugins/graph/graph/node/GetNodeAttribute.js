import GetObjUID from '../../graphitem/GetObjUID.js';

var GetNodeAttribute = function (gameObject, key) {
    var nodeUID = GetObjUID(gameObject);

    if (key === undefined) {
        return this.graph.getNodeAttributes(nodeUID);
    } else {
        return this.graph.getNodeAttribute(nodeUID, key);
    }
}

export default GetNodeAttribute;