/* 

javascript-astar 0.3.0
http://github.com/bgrins/javascript-astar
Freely distributable under the MIT License.
Implements the astar search algorithm in javascript using a Binary Heap.
Includes Binary Heap (with modifications) from Marijn Haverbeke.
http://eloquentjavascript.net/appendix2.html

*/

import GetChessData from '../../chess/GetChessData.js';
import NodeManager from './NodeManager.js';
import BinaryHeap from './BinaryHeap.js';
import CONST from '../const.js';

const AREA_MODE = CONST.AREA_MODE;
const PATH_MODE = CONST.PATH_MODE;
const NEAREST_PATH_MODE = CONST.NEAREST_PATH_MODE;

const ASTAR = CONST['A*'];
const ASTAR_LINE = CONST['A*-line'];
const ASTAR_RANDOM = CONST['A*-random'];

const BLOCKER = CONST['blocker'];
const INFINITY = CONST['infinity'];

// global objects
var gNodeManager = new NodeManager();
var gOpenHeap = new BinaryHeap(function (node) {
    return node.f;
});
// global objects

var AStarSerach = function (startChess, endTileXY, movingPoints, mode, callback) {
    // initial object references
    var chessData = GetChessData(startChess);
    this.board = chessData.board;
    gNodeManager.setPathFinder(this);
    // initial object references


    var isAreaSearch = (mode === AREA_MODE);
    var isPathSearch = ((mode === PATH_MODE) || (mode === NEAREST_PATH_MODE));
    var isAStarMode = (this.pathMode === ASTAR) || (this.pathMode === ASTAR_LINE) || (this.pathMode === ASTAR_RANDOM);
    var astarHeuristicEnable = isPathSearch && isAStarMode;
    var shortestPathEnable = isPathSearch && (!isAStarMode);
    var astarHeuristicMode = (!astarHeuristicEnable) ? null :
        (this.pathMode == ASTAR) ? 0 :
        (this.pathMode == ASTAR_LINE) ? 1 :
        (this.pathMode == ASTAR_RANDOM) ? 2 :
        null;

    var end = (endTileXY !== null) ? gNodeManager.getNode(endTileXY.x, endTileXY.y) : null;
    var startTileXYZ = chessData.tileXYZ;
    var start = gNodeManager.getNode(startTileXYZ.x, startTileXYZ.y);
    start.h = start.heuristic(end, astarHeuristicMode);

    // NEAREST NODE
    var closestNode = start;
    // helper function to update closerH                
    var updateCloserH = function (node, baseNode) {
        if (astarHeuristicEnable) {
            node.closerH = node.h;
        } else {
            node.closerH = node.closerH || node.heuristic(end, astarHeuristicMode, baseNode);
        }
    };
    if (isPathSearch) {
        updateCloserH(closestNode);
    }
    // NEAREST NODE

    gOpenHeap.push(start);
    while (gOpenHeap.size() > 0) {
        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        var curNode = gOpenHeap.pop();

        // End case -- result has been found, return the traced path.
        if (astarHeuristicEnable && (curNode === end)) {
            break;
        }

        // Normal case -- move curNode from open to closed, process each of its neighbors.
        curNode.closed = true;

        // Find all neighbors for the current node.
        var neighbors = curNode.getNeighborNodes();

        var neighbor, neighborCost, isNeighborMoreCloser;
        for (var i = 0, cnt = neighbors.length; i < cnt; ++i) {
            neighbor = neighbors[i];
            neighborCost = neighbor.getCost(curNode);
            if (neighbor.closed || (neighborCost === BLOCKER)) {
                // Not a valid node to process, skip to next neighbor.
                //log("("+neighbor.x+","+neighbor.y+") is closed");
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = curNode.g + neighborCost,
                beenVisited = neighbor.visited;

            //log("("+curNode.x+","+curNode.y+") -> ("+neighbor.x+","+neighbor.y+")="+neighborCost+" ,acc="+gScore);
            if ((movingPoints != INFINITY) && (gScore > movingPoints)) {
                //log("("+neighbor.x+","+neighbor.y+") out of range");
                continue;
            }

            if (!beenVisited || gScore < neighbor.g) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.preNodeKeys.length = 0;
                neighbor.preNodeKeys.push(curNode.key);
                neighbor.h = neighbor.h || neighbor.heuristic(end, astarHeuristicMode, start);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                this.costCache[neighbor.key] = gScore;

                // NEAREST NODE
                if (isPathSearch) {
                    updateCloserH(neighbor, start);
                    isNeighborMoreCloser = (neighbor.closerH < closestNode.closerH) ||
                        ((neighbor.closerH === closestNode.closerH) && (neighbor.g < closestNode.g));

                    if (isNeighborMoreCloser) {
                        closestNode = neighbor;
                    }
                }
                // NEAREST NODE

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    gOpenHeap.push(neighbor);
                    //log("push ("+neighbor.x+","+neighbor.y+") ")
                } else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    gOpenHeap.rescoreElement(neighbor);
                    //log("reorder ("+neighbor.x+","+neighbor.y+") ")
                }
            } else if (shortestPathEnable && (gScore == neighbor.g)) {
                neighbor.preNodeKeys.push(curNode.key);

                //if (neighbor.preNodeKeys.indexOf(curNode.key) == -1)                    
                //    neighbor.preNodeKeys.push(curNode.key);                    
                //else                    
                //    debugger;                 

                //log("drop ("+neighbor.x+","+neighbor.y+") ")                
            } else {
                //log("drop ("+neighbor.x+","+neighbor.y+") ")       
            }
        }

    }


    if (callback) {
        callback(gNodeManager, closestNode);
    }
    // release object references    
    gOpenHeap.clear();
    this.board = undefined;
    gNodeManager.setPathFinder(undefined);
    gNodeManager.freeAllNodes();
    // release object references
    return this;
}
export default AStarSerach;