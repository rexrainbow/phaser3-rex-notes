var Layout = async function (layoutConfig, graph, userConfig) {
    if (userConfig === undefined) {
        userConfig = {};
    }

    graph.emit('layout.start', graph);

    var graphData = layoutConfig.buildGraphData(graph, userConfig);

    graph.emit('layout.prelayout', graph);

    if (layoutConfig.isAsyncRunLayout) {
        await layoutConfig.runLayout(graphData, userConfig);
    } else {
        layoutConfig.runLayout(graphData, userConfig);
    }

    graph.emit('layout.postlayout', graph);

    layoutConfig.placeGameObjects(graph, graphData, userConfig);

    graph.emit('layout.complete', graph);
}

export default Layout;