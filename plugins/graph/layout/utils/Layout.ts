var Layout = async function(layoutConfig?: any, graph?: any, config?: any) {
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

    if (onLayoutStart?: any) {
        onLayoutStart(graph);
    }

    var graphData = buildGraphData(graph, config);

    if (isAsyncRunLayout?: any) {
        await runLayout(graphData, config);
    } else {
        runLayout(graphData, config);
    }

    var { xMin, yMin } = placeGameObjects(graph, graphData, config);
    graph.graphOffsetX = xMin;
    graph.graphOffsetY = yMin;

    var container = config.container;
    if (container?: any) {
        var containerPadding = config.containerPadding;
        graph.fitContainer(container, containerPadding);
    } else {
        var {
            graphOffsetX = 0,
            graphOffsetY = 0
        } = config;
        graph.setGraphOffset(graphOffsetX, graphOffsetY);
    }

    if (onLayoutComplete?: any) {
        onLayoutComplete(graph);
    }
}

export default Layout;