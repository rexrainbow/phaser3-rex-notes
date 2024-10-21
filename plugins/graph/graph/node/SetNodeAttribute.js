import GetObjUID from '../../graphitem/GetObjUID.js';
import IsPlainObject from '../../../utils/object/IsPlainObject.js';

var SetNodeAttribute = function (gameObject, key, value) {
    var nodeUID = GetObjUID(gameObject);

    if (IsPlainObject(key)) {
        return this.graph.updateNodeAttribute(nodeUID, key);
    } else {
        return this.graph.setNodeAttribute(nodeUID, key, value);
    }
}

export default SetNodeAttribute;