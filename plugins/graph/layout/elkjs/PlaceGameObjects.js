import AlignIn from '../../../utils/actions/AlignIn.js';
import GetPath from './GetPath.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var PlaceGameObjects = function (graph, graphData, config) {
    var xMin = Infinity,
        yMin = Infinity;

    graphData.children.forEach(function (nodeData) {
        var gameObject = nodeData.gameObject;
        if (graph.isNullNode(gameObject)) {
            return;
        }

        var padding = nodeData.padding;
        var x = nodeData.x + padding.left;
        var y = nodeData.y + padding.top;
        var width = nodeData.width - padding.left - padding.right;
        var height = nodeData.height - padding.top - padding.bottom;
        AlignIn(gameObject, x, y, width, height, ALIGN_CENTER);

        if (xMin > x) { xMin = x; }
        if (yMin > y) { yMin = y; }

        graph.emit('layout.node', nodeData.gameObject);
    })

    graphData.edges.forEach(function (edgeData) {
        var gameObject = edgeData.gameObject;
        if (graph.isNullEdge(gameObject)) {
            return;
        }
        var path = GetPath(edgeData);
        graph.emit('layout.edge', gameObject, path, edgeData.sourceGameObject, edgeData.targetGameObject);
    })

    return { xMin, yMin };
}

export default PlaceGameObjects;