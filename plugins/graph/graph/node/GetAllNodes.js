import UidToObj from '../../graphitem/UidToObj.js';

var GetAllNodes = function (out) {
    if (out === undefined) {
        out = [];
    }

    var vGO;
    for (var vUid in this.vertices) {
        vGO = UidToObj(vUid);
        if (vGO) {
            out.push(vGO);
        }
    }
    return out;
};

export default GetAllNodes;
