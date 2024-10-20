import ELK from '../../../utils/elkjs/elk.bundled.js';
import BuildGraphData from './BuildGraphData.js';
import PlaceGameObjects from './PlaceGameObjects.js';

var Layout = async function (graph, config) {
    var elk = new ELK();
    var graphData = BuildGraphData(graph, config);
    graphData = await elk.layout(graphData);
    PlaceGameObjects(graphData, graph);
}

export default Layout;