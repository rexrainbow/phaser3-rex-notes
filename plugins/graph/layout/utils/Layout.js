var Layout = async function (layoutConfig, graph, userConfig) {
    var {
        buildGraphData,
        isAsyncRunLayout, runLayout,
        placeGameObjects,
    } = layoutConfig;

    if (userConfig === undefined) {
        userConfig = {};
    }

    graph.emit('layout.start', graph);

    var graphData = buildGraphData(graph, userConfig);

    graph.emit('layout.prelayout', graph);

    if (isAsyncRunLayout) {
        await runLayout(graphData, userConfig);
    } else {
        runLayout(graphData, userConfig);
    }

    var offset = { x: 0, y: 0 };
    graph.emit('layout.postlayout', graph, graphBounds, offset);

    placeGameObjects(graph, graphData, userConfig);

    graph.emit('layout.complete', graph);
}

export default Layout;