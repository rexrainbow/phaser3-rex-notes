var Layout = async function (layoutConfig, graph, config) {
    var {
        buildGraphData,
        isAsyncRunLayout, runLayout,
        placeGameObjects,
    } = layoutConfig;

    if (config === undefined) {
        config = {};
    }

    var {
        onLayoutStart,
        onLayoutComplete
    } = config;

    if (onLayoutStart) {
        onLayoutStart(graph);
    }

    var graphData = buildGraphData(graph, config);

    if (isAsyncRunLayout) {
        await runLayout(graphData, config);
    } else {
        runLayout(graphData, config);
    }

    var { xMin, yMin } = placeGameObjects(graph, graphData, config);
    graph.graphOffsetX = xMin;
    graph.graphOffsetY = yMin;

    var container = config.container;
    if (container) {
        var containerPadding = config.containerPadding;
        graph.fitContainer(container, containerPadding);
    } else {
        var {
            graphOffsetX = 0,
            graphOffsetY = 0
        } = config;
        graph.setGraphOffset(graphOffsetX, graphOffsetY);
    }

    if (onLayoutComplete) {
        onLayoutComplete(graph);
    }
}

export default Layout;