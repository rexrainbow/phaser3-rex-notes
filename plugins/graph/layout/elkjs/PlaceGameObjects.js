import AlignIn from '../../../utils/actions/AlignIn.js';
import GetPath from './GetPath.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var PlaceGameObjects = function (graph, graphData, config) {
    graphData.children.forEach(function (nodeData) {
        var gameObject = nodeData.gameObject;
        var padding = nodeData.padding;
        var x = nodeData.x + padding.left;
        var y = nodeData.y + padding.top;
        var width = nodeData.width - padding.left - padding.right;
        var height = nodeData.height - padding.top - padding.bottom;
        AlignIn(gameObject, x, y, width, height, ALIGN_CENTER);
        graph.emit('layout.node', nodeData.gameObject);
    })

    graphData.edges.forEach(function (edgeData) {
        var path = GetPath(edgeData);
        graph.emit('layout.edge', edgeData.gameObject, path, edgeData.sourceGameObject, edgeData.targetGameObject);
    })
}

export default PlaceGameObjects;