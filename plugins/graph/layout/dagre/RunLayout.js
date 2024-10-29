import dagre from 'dagre';

var RunLayout = async function (graphData, config) {
    await dagre.layout(graphData);
}

export default RunLayout;
