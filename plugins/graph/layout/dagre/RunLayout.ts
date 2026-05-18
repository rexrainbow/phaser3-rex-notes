import dagre from 'dagre';

var RunLayout = async function(graphData?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }

    await dagre.layout(graphData);
}

export default RunLayout;