import GetGraphItem from './GetGraphItem';
import ObjBank from './ObjBank';
import IsUID from './IsUID';

const uidKey = ObjBank.uidKey;
var GetObjUID = function(gameObject?: any, newUID?: any) {
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