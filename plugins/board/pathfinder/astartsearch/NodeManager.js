import Pool from 'rexPlugins/utils/object/Stack.js';
import TileXYToKey from '../../utils/tilexyzkey/TileXYToKey.js';
import Node from './Node.js';

class NodeCache {
    constructor() {
        this.sn = 0;
        this.pool = new Pool(); // recycle dead nodes
        this.nodes = {}; // {tileXYKey:node}
        this.pathFinder = undefined;
    }

    setPathFinder(pathFinder) {
        this.pathFinder = pathFinder;
        return this;
    }

    getNode(tileX, tileY, createNewNode) {
        if (typeof (tileX) !== 'number') {
            var tileXY = tileX;
            createNewNode = tileY;
            tileX = tileXY.x;
            tileY = tileXY.y;
        }
        if (createNewNode === undefined) {
            createNewNode = true;
        }        

        this.sn++;
        var key = TileXYToKey(tileX, tileY);
        if (!this.nodes.hasOwnProperty(key)) {
            if (!createNewNode) {
                return null;
            }

            var node = this.pool.pop();
            if (node === null) {
                node = new Node(this);
            }
            node.reset();
            node.pathFinder = this.pathFinder;
            node.sn = this.sn;
            node.key = key;
            node.x = tileX;
            node.y = tileY;
            this.nodes[key] = node;
        }
        return this.nodes[key];
    }

    freeAllNodes() {
        var nodes = this.nodes,
            pool = this.pool;
        var node;
        for (var key in nodes) {
            node = nodes[key];
            node.destroy();
            pool.push(node);
            delete nodes[key];
        }
        this.sn = 0;
        return this;
    }

    getAllNodes() {
        return this.nodes;
    }
}
export default NodeCache;