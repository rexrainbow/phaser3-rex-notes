var RandomPieceEdges = function (columns, rows) {
    var edges = [];
    for (var c = 0; c < columns; c++) {
        edges.push(new Array(rows));
    }

    var left, right, top, bottom;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            // left
            if (c === 0) {
                left = 0;
            } else {
                var neighborEdge = edges[c - 1][r].right;
                left = (neighborEdge === 1) ? 2 : 1;
            }

            // top
            if (r === 0) {
                top = 0;
            } else {
                var neighborEdge = edges[c][r - 1].bottom;
                top = (neighborEdge === 1) ? 2 : 1;
            }

            // right
            if (c === (columns - 1)) {
                right = 0;
            } else {
                right = (Math.random() > 0.5) ? 2 : 1;
            }

            // bottom
            if (r === (rows - 1)) {
                bottom = 0;
            } else {
                bottom = (Math.random() > 0.5) ? 2 : 1;
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

export default RandomPieceEdges;