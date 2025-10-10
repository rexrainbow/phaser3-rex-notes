import ObjBank from './ObjBank.js';
import GraphItemData from './GraphItemData.js';
import IsUID from './IsUID.js';

var GetGraphItem = function (gameObject, uid) {
    // game object or uid
    if (IsUID(gameObject)) {
        // uid
        return ObjBank.get(gameObject);
    } else {
        // game object
        if (!gameObject.hasOwnProperty('rexGraph')) {
            gameObject.rexGraph = new GraphItemData(gameObject, uid);
        }
        return gameObject.rexGraph;
    }
}
export default GetGraphItem;