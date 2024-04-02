var GenerateEdges = function (columns, rows, callbacks) {

    var getRightEdgeCallback = (callbacks) ? callbacks.getRightEdge : undefined;
    var getBottomEdgeCallback = (callbacks) ? callbacks.getBottomEdge : undefined;

    if (!getRightEdgeCallback) {
        getRightEdgeCallback = DefaultGetEdgeCallback;
    }
    if (!getBottomEdgeCallback) {
        getBottomEdgeCallback = DefaultGetEdgeCallback;
    }

    var edges = [];
    for (var c = 0; c < columns; c++) {
        edges.push(new Array(rows));
    }

    var lastColumnIndex = columns - 1;
    var lastRowIndex = rows - 1;
    var left, right, top, bottom;
    var neighborEdge;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            // left
            if (c === 0) {
                left = 0;
            } else {
                neighborEdge = edges[c - 1][r].right;
                left = OppositeEdgeMap[neighborEdge] || 0;
            }

            // top
            if (r === 0) {
                top = 0;
            } else {
                neighborEdge = edges[c][r - 1].bottom;
                top = OppositeEdgeMap[neighborEdge] || 0;
            }

            // right
            if (c === lastColumnIndex) {
                right = 0;
            } else {
                right = getRightEdgeCallback(c, r);
            }

            // bottom
            if (r === lastRowIndex) {
                bottom = 0;
            } else {
                bottom = getBottomEdgeCallback(c, r);
            }

            edges[c][r] = {
                left,
                right,
                top,
                bottom
            }
        }
    }

    return edges;
}

var DefaultGetEdgeCallback = function (c, r) {
    return (Math.random() > 0.5) ? 2 : 1;
}

var OppositeEdgeMap = {
    1: 2,
    2: 1
};

export default GenerateEdges;