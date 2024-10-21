import AlignIn from '../../../utils/actions/AlignIn.js';
import GetPath from './GetPath.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;

var PlaceGameObjects = function (graph, graphData, config) {
    graphData.children.forEach(function (nodeData) {
        AlignIn(nodeData.gameObject, nodeData.x, nodeData.y, nodeData.width, nodeData.height, ALIGN_CENTER);
        graph.emit('layout.node', nodeData.gameObject);
    })

    graphData.edges.forEach(function (edgeData) {
        var path = GetPath(edgeData);
        graph.emit('layout.edge', edgeData.gameObject, path, edgeData.sourceGameObject, edgeData.targetGameObject);
    })
}

export default PlaceGameObjects;