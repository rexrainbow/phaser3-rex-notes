import GetObjUID from '../../graphitem/GetObjUID.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';

var SetEdgeAttribute = function (gameObject, key, value) {
    var edgeUID = GetObjUID(gameObject);

    if (IsPlainObject(key)) {
        return this.graph.updateEdgeAttribute(edgeUID, key);
    } else {
        return this.graph.setEdgeAttribute(edgeUID, key, value);
    }
}

export default SetEdgeAttribute;