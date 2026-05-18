import ObjBank from './ObjBank';

var UIDListToObjList = function(uidList?: any, out?: any) {
    if (out === undefined) {
        out = [];
    }

    for (var i = 0, cnt = uidList.length; i < cnt; i++) {
        var graphItem = ObjBank.get(uidList[i]);
        if (!graphItem || !graphItem.parent) {
            continue;
        }

        out.push(graphItem.parent);
    }

    return out;
}
export default UIDListToObjList;