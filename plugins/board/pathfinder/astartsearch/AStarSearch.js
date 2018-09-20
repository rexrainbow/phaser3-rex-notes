/* 

javascript-astar 0.3.0
http://github.com/bgrins/javascript-astar
Freely distributable under the MIT License.
Implements the astar search algorithm in javascript using a Binary Heap.
Includes Binary Heap (with modifications) from Marijn Haverbeke.
http://eloquentjavascript.net/appendix2.html

*/

import GetChessData from '../chess/GetChessData.js';
import BinaryHeap from './BinaryHeap.js';
import {
    GetNode,
    FreeAllNodes,
    GetAllNodes
} from './GetNode.js';
import CONST from '../const.js';

const AREA_MODE = CONST.AREA_MODE;
const PATH_MODE = CONST.PATH_MODE;
const NEAREST_PATH_MODE = CONST.NEAREST_PATH_MODE;

const ASTAR = CONST['A*'];
const ASTAR_LINE = CONST['A*-line'];
const ASTAR_RANDOM = CONST['A*-random'];

var openHeap = new BinaryHeap(function (node) {
    return node.f;
});
var AStarSerach = function (startChess, endTileXY, movingPoints, mode) {
    var chessData = GetChessData(chess);
    this.board = chessData.board;

    // var isAreaSearch = (mode === AREA_MODE);
    var isPathSearch = ((mode === PATH_MODE) || (mode === NEAREST_PATH_MODE));
    var isAStarMode = (this.pathMode === ASTAR) || (this.pathMode === ASTAR_LINE) || (this.pathMode === ASTAR_RANDOM);
    var astarHeuristicEnable = isPathSearch && isAStarMode;
    var shortestPathEnable = isPathSearch && (!isAStarMode);
    var astarHeuristicMode = (!astarHeuristicEnable) ? null :
        (this.pathMode == ASTAR) ? 0 :
        (this.pathMode == ASTAR_LINE) ? 1 :
        (this.pathMode == ASTAR_RANDOM) ? 2 :
        null;

    var end = (endTileXY !== null) ? GetNode(this, endTileXY.x, endTileXY.y) : null;
    var startTileXYZ = chessData.tileXYZ;
    var start = GetNode(this, startTileXYZ.x, startTileXYZ.y);
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

    openHeap.push(start);
    while (openHeap.size() > 0) {
        // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
        var currentNode = openHeap.pop();

        // End case -- result has been found, return the traced path.
        if (astarHeuristicEnable && (currentNode === end)) {
            break;
        }

        // Normal case -- move currentNode from open to closed, process each of its neighbors.
        currentNode.closed = true;

        // Find all neighbors for the current node.
        var neighbors = currentNode.getNeighborNodes();

        var il = neighbors.length;
        for (var i = 0; i < il; ++i) {
            var neighbor = neighbors[i];
            var neighborCost = neighbor.getCost(currentNode);
            if (neighbor.closed || isWall(neighborCost)) {
                // Not a valid node to process, skip to next neighbor.
                //log("("+neighbor.x+","+neighbor.y+") is closed");
                continue;
            }

            // The g score is the shortest distance from start to current node.
            // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
            var gScore = currentNode.g + neighborCost,
                beenVisited = neighbor.visited;

            //log("("+currentNode.x+","+currentNode.y+") -> ("+neighbor.x+","+neighbor.y+")="+neighborCost+" ,acc="+gScore);
            if ((movingPoints != prop_INFINITY) && (gScore > movingPoints)) {
                //log("("+neighbor.x+","+neighbor.y+") out of range");
                continue;
            }

            if (!beenVisited || gScore < neighbor.g) {

                // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                neighbor.visited = true;
                neighbor.parent.length = 0;
                neighbor.parent.push(currentNode.uid);
                neighbor.h = neighbor.h || neighbor.heuristic(end, astarHeuristicMode, start);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                this.uid2cost[neighbor.uid] = gScore;

                // NEAREST NODE
                if (isPathSearch) {
                    updateCloserH(neighbor, start);
                    var isNeighborMoreCloser = (neighbor.closerH < closestNode.closerH) ||
                        ((neighbor.closerH === closestNode.closerH) && (neighbor.g < closestNode.g));

                    if (isNeighborMoreCloser) {
                        closestNode = neighbor;
                    }
                }
                // NEAREST NODE

                if (!beenVisited) {
                    // Pushing to heap will put it in proper place based on the 'f' value.
                    openHeap.push(neighbor);
                    //log("push ("+neighbor.x+","+neighbor.y+") ")
                } else {
                    // Already seen the node, but since it has been rescored we need to reorder it in the heap
                    openHeap.rescoreElement(neighbor);
                    //log("reorder ("+neighbor.x+","+neighbor.y+") ")
                }
            } else if (shortestPathEnable && (gScore == neighbor.g)) {
                neighbor.parent.push(currentNode.uid);

                //if (neighbor.parent.indexOf(currentNode.uid) == -1)                    
                //    neighbor.parent.push(currentNode.uid);                    
                //else                    
                //    debugger;                 

                //log("drop ("+neighbor.x+","+neighbor.y+") ")                
            } else {
                //log("drop ("+neighbor.x+","+neighbor.y+") ")       
            }
        }

    }

    openHeap.clear();
    this.board = undefined;
    return GetAllNodes();
}
export default AStarSerach;