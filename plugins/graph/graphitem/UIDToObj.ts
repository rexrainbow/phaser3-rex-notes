import ObjBank from './ObjBank';

var UIDToObj = function(uid?: any) {
    if (uid == null) {
        return null;
    } else {
        return ObjBank.get(uid).parent;
    }
}

export default UIDToObj;