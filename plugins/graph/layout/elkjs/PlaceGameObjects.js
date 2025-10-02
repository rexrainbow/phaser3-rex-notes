import AlignIn from '../../../utils/actions/AlignIn.js';
import GetPath from './GetPath.js';

const ALIGN_CENTER = Phaser.Display.Align.CENTER;
const GetValue = Phaser.Utils.Objects.GetValue;

var PlaceGameObjects = function (graph, graphData, config) {
    var offsetX = GetValue(config, 'x', 0);
    var offsetY = GetValue(config, 'y', 0);
    var hasOffset = (offsetX !== 0) || (offsetY !== 0);
    
    graphData.children.forEach(function (nodeData) {
        var gameObject = nodeData.gameObject;
        var padding = nodeData.padding;
        var x = nodeData.x + padding.left;
        var y = nodeData.y + padding.top;

        if (hasOffset) {
            x += offsetX;
            y += offsetY;
        }

        var width = nodeData.width - padding.left - padding.right;
        var height = nodeData.height - padding.top - padding.bottom;
        AlignIn(gameObject, x, y, width, height, ALIGN_CENTER);
        graph.emit('layout.node', nodeData.gameObject);
    })

    graphData.edges.forEach(function (edgeData) {
        var path = GetPath(edgeData);

        if (hasOffset) {
            for (var i = 0, cnt = path.length; i < cnt; i++) {
                var p = path[i];
                p.x += offsetX;
                p.y += offsetY;
            }
        }

        graph.emit('layout.edge', edgeData.gameObject, path, edgeData.sourceGameObject, edgeData.targetGameObject);
    })
}

export default PlaceGameObjects;