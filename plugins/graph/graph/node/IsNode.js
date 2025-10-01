import GetObjUID from '../../graphitem/GetObjUID.js';

var IsNode = function (gameObejct) {
    // uid or game object
    var uid = GetObjUID(gameObejct, false);
    if (uid === null) {
        return false;
    }

    return this.graph.hasNode(uid);
}

export default IsNode;