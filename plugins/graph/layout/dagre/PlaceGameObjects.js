import AlignIn from '../../../utils/actions/AlignIn.js';
import GetPath from './GetPath.js';
import DefaultLayoutEdgeCallback from '../utils/DefaultLayoutEdgeCallback.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var PlaceGameObjects = function (graph, graphData, config) {
    if (config === undefined) {
        config = {};
    }

    var {
        onLayoutNode,
        onLayoutEdge = DefaultLayoutEdgeCallback
    } = config;

    var xMin = Infinity,
        yMin = Infinity;

    graphData.nodes().forEach(function (nodeKey) {
        var nodeData = graphData.node(nodeKey);
        var gameObject = nodeData.gameObject;
        if (graph.isDummyNode(gameObject)) {
            return;
        }

        var padding = nodeData.padding;
        var x = nodeData.x - (nodeData.width / 2) + padding.left;  // nodeData.x is centerX
        var y = nodeData.y - (nodeData.height / 2) + padding.top;  // nodeData.y is centerY
        var width = nodeData.width - padding.left - padding.right;
        var height = nodeData.height - padding.top - padding.bottom;
        AlignIn(gameObject, x, y, width, height, ALIGN_CENTER);

        if (xMin > x) { xMin = x; }
        if (yMin > y) { yMin = y; }

        if (onLayoutNode) {
            onLayoutNode(gameObject);
        }
    });

    graphData.edges().forEach(function (edgeKey) {
        var edgeData = graphData.edge(edgeKey);
        var gameObject = edgeData.gameObject;
        if (graph.isInvisibleEdge(gameObject)) {
            return;
        }

        var path = GetPath(edgeData);
        if (onLayoutEdge) {
            onLayoutEdge(gameObject, path, edgeData.sourceGameObject, edgeData.targetGameObject);
        }
    });

    return { xMin, yMin };
}

export default PlaceGameObjects;