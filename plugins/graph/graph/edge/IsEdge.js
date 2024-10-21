import GetObjUID from '../../graphitem/GetObjUID.js';

var IsEdge = function (gameObejct) {
    // uid or game object
    var uid = GetObjUID(gameObejct);
    return this.graph.hasEdge(uid);
}

export default IsEdge;