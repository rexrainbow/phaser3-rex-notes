import AlignIn from '../../../utils/actions/AlignIn';
import GetPath from './GetPath';
import DefaultLayoutEdgeCallback from '../utils/DefaultLayoutEdgeCallback';

import { Display as PhaserDisplay } from 'phaser';
const ALIGN_CENTER = PhaserDisplay.Align.CENTER;

var PlaceGameObjects = function(graph?: any, graphData?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }

    var {
        onLayoutNode,
        onLayoutEdge = DefaultLayoutEdgeCallback
    } = config;


    var xMin = Infinity,
        yMin = Infinity;

    graphData.children.forEach(function(nodeData?: any) {
        var gameObject = nodeData.gameObject;
        if (gameObject.$dummy) {
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

        if (onLayoutNode?: any) {
            onLayoutNode(gameObject);
        }
    })

    graphData.edges.forEach(function(edgeData?: any) {
        var gameObject = edgeData.gameObject;
        if (gameObject.$invisible) {
            return;
        }
        var path = GetPath(edgeData);

        if (onLayoutEdge?: any) {
            onLayoutEdge(gameObject, path, edgeData.sourceGameObject, edgeData.targetGameObject);
        }
    })

    return { xMin, yMin };
}

export default PlaceGameObjects;