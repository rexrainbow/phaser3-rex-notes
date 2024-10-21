import GetObjUID from '../../graphitem/GetObjUID.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';

var SetEdgeAttribute = function (gameObject, key, value) {
    var nodeUID = GetObjUID(gameObject);

    if (IsPlainObject(key)) {
        return this.graph.updateEdgeAttribute(nodeUID, key);
    } else {
        return this.graph.setEdgeAttribute(nodeUID, key, value);
    }
}

export default SetEdgeAttribute;