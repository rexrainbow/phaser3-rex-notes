import ELK from '../../../utils/elkjs/elk.bundled.js';
import BuildGraphData from './BuildGraphData.js';
import PlaceGameObjects from './PlaceGameObjects.js';

var Layout = async function (graph, config) {
    if (config === undefined) {
        config = {};
    }

    graph.emit('layout.start', graph);

    var graphData = BuildGraphData(graph, config);

    graph.emit('layout.prelayout', graph);

    var elk = new ELK();
    graphData = await elk.layout(graphData, {
        layoutOptions: config.layoutOptions,

    });

    graph.emit('layout.postlayout', graph);

    PlaceGameObjects(graph, graphData, config);

    graph.emit('layout.complete', graph);
}

export default Layout;