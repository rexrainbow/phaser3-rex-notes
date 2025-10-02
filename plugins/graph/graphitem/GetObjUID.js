import GetGraphItem from './GetGraphItem.js';
import ObjBank from './ObjBank.js';
import IsUID from './IsUID.js';

const uidKey = ObjBank.uidKey;
var GetObjUID = function (gameObject, newUID) {
    if (newUID === undefined) {
        newUID = true;
    }

    // Game object or uid
    var uid;
    if (IsUID(gameObject)) {
        uid = gameObject;
    } else {
        if (gameObject.hasOwnProperty('rexGraph')) {
            uid = gameObject.rexGraph[uidKey];
        } else if (newUID) {
            uid = GetGraphItem(gameObject)[uidKey];
        } else {
            uid = null;
        }
    }
    return uid;
}
export default GetObjUID;