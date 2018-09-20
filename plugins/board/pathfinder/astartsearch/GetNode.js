import Pool from 'rexPlugins/utils/object/Stack.js';
import {
    TileXYToKey
} from '../../utils/key/TileXYZKey.js';
import Node from './Node.js';

var liveNodes = {}; // {key:node}
var nodeCache = new Pool(); // recycle dead nodes
var sn = 0;

var GetNode = function (pathFinder, tileX, tileY) {
    sn++;
    var key = TileXYToKey(tileX, tileY);
    if (!liveNodes.hasOwnProperty(key)) {
        var node = nodeCache.pop();
        if (node === null) {
            node = new Node();
        }
        node.reset();
        node.pathFinder = pathFinder;
        node.sn = sn;
        node.key = key;
        node.x = tileX;
        node.y = tileY;
        liveNodes[key] = node;
    }
    return liveNodes[key];
}

var FreeAllNodes = function () {
    for (var key in liveNodes) {
        nodeCache.push(liveNodes[key]);
        delete liveNodes[key];
    }
    sn = 0;
}

var GetAllNodes = function () {
    return liveNodes;
}

export {
    GetNode,
    FreeAllNodes,
    GetAllNodes
};