import ELK from '../../../utils/elkjs/elk.bundled.js';
import BuildGraphData from './BuildGraphData.js';
import PlaceGameObjects from './PlaceGameObjects.js';

var Layout = function (graph, config) {
    var graphData = BuildGraphData(graph, config);

    var elk = new ELK();
    elk.layout(graphData)
        .then(function (graphData) {
            PlaceGameObjects(graph, graphData, config);
            graph.emit('layout.complete');
        })
}

export default Layout;