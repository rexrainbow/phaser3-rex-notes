import ObjBank from './ObjBank';
import GraphItemData from './GraphItemData';
import IsUID from './IsUID';

var GetGraphItem = function(gameObject?: any, uid?: any) {
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