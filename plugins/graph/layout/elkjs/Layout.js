import ELK from '../../../utils/elkjs/elk.bundled.js';
import BuildGraphData from './BuildGraphData.js';
import PlaceGameObjects from './PlaceGameObjects.js';

var Layout = async function (graph, config) {
    graph.emit('layout.start', graph);

    var elk = new ELK();
    var graphData = BuildGraphData(graph, config);
    graphData = await elk.layout(graphData);
    PlaceGameObjects(graph, graphData, config);

    graph.emit('layout.complete', graph);
}

export default Layout;