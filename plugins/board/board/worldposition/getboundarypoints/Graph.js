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
        var visitedEdges = new Set();
        var stack = [{ current: startNodeKey, nextIndex: 0 }];
        while (stack.length > 0) {
            var frame = stack[stack.length - 1];
            var currentNodeKey = frame.current;
            var adjacency = nodes.get(currentNodeKey);
            if (frame.nextIndex >= adjacency.length) {
                path.pop();
                stack.pop();
                continue;
            }

            var nextNodeKey = adjacency[frame.nextIndex];
            frame.nextIndex += 1;

            var edgeKey = [currentNodeKey, nextNodeKey].sort().join('->');
            if (visitedEdges.has(edgeKey)) {
                continue;
            }

            if (nextNodeKey === startNodeKey && path.length > 2) {
                return path.map(KeyToPoint);
            }

            if (!path.includes(nextNodeKey)) {
                visitedEdges.add(edgeKey);
                stack.push({ current: nextNodeKey, nextIndex: 0 });
                path.push(nextNodeKey);
            }
        }

        return [];
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