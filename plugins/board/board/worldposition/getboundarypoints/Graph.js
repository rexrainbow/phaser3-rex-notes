class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addEdges(edges) {
        for (var i = 0, cnt = edges.length; i < cnt; i++) {
            this.addEdge(edges[i]);
        }
        return this;
    }

    addEdge(edge) {
        var nodes = this.nodes;

        var [point1, point2] = edge;
        var key1 = PointToKey(point1);
        var key2 = PointToKey(point2);

        if (!nodes.has(key1)) {
            nodes.set(key1, [])
        };
        nodes.get(key1).push(key2);

        if (!nodes.has(key2)) {
            nodes.set(key2, [])
        };
        nodes.get(key2).push(key1);

        return this;
    }

    findCycle(startNodeKey) {
        if (typeof (startNodeKey) !== 'string') {
            startNodeKey = PointToKey(startNodeKey);
        }

        var nodes = this.nodes;
        var path = [startNodeKey];
        var dfs = function (currentNodeKey) {
            var nextNodes = nodes.get(currentNodeKey);
            for (var i = 0, cnt = nextNodes.length; i < cnt; i++) {
                var nextNodeKey = nextNodes[i];

                if ((path.length > 3) && (nextNodeKey === startNodeKey)) { // Found cycle
                    return path.map(KeyToPoint);

                } else if (path.indexOf(nextNodeKey) === -1) {
                    path.push(nextNodeKey);
                    var result = dfs(nextNodeKey);
                    if (result) {
                        return result;
                    }
                    path.pop();

                }
            }
        }

        var points = dfs(startNodeKey);
        return points;
    }

}

var PointToKey = function (point) {
    return `${point.x},${point.y}`;
}

var KeyToPoint = function (key) {
    var [x, y] = key.split(',').map(Number);
    return { x, y };
}

export default Graph;