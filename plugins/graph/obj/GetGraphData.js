import ObjBank from './ObjBank.js';
import GraphData from './GraphData.js';
import IsUID from './IsUID';

var GetGraphData = function (gameObject) {
    // game object or uid
    if (IsUID(gameObject)) {
        // uid
        return ObjBank.get(gameObject);
    } else {
        // game object
        if (!gameObject.hasOwnProperty('rexGraph')) {
            gameObject.rexGraph = new GraphData(gameObject);
        }
        return gameObject.rexGraph;
    }
}
export default GetGraphData;