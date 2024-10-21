import ObjBank from './ObjBank.js';

var UIDToObj = function (uid) {
    if (uid == null) {
        return null;
    } else {
        return ObjBank.get(uid).parent;
    }
}

export default UIDToObj;