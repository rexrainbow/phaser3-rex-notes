var Layout = async function (callbacks, graph, config) {
    if (config === undefined) {
        config = {};
    }

    graph.emit('layout.start', graph);

    var graphData = callbacks.buildGraphData(graph, config);

    graph.emit('layout.prelayout', graph);

    if (callbacks.isAsyncRunLayout) {
        await callbacks.runLayout(graphData, config);
    } else {
        callbacks.runLayout(graphData, config);
    }

    graph.emit('layout.postlayout', graph);

    callbacks.placeGameObjects(graph, graphData, config);

    graph.emit('layout.complete', graph);
}

export default Layout;