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

    graph.emit('layout.postlayout', graph);

    var { xMin, yMin } = placeGameObjects(graph, graphData, userConfig);
    graph.graphOffsetX = xMin;
    graph.graphOffsetY = yMin;

    var {
        container,
        containerPadding,
    } = userConfig;
    if (container) {
        graph.fitContainer(container, containerPadding);
    } else {
        graph.setGraphOffset(0, 0);
    }

    graph.emit('layout.complete', graph);
}

export default Layout;