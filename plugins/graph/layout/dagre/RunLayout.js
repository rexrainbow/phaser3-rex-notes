import dagre from 'dagre';

var RunLayout = async function (graphData, config) {
    if (config === undefined) {
        config = {};
    }

    await dagre.layout(graphData);
}

export default RunLayout;
