class Node {
    constructor() {
        this.parents = [];
    }

    reset() {
        // overwrite
        this.pathFinder = undefined;
        this.sn = sn; // for sorting by created order        
        this.key = key;
        this.x = 0;
        this.y = 0;
        // overwrite

        this.px = null;
        this.py = null;
        this.cost = null;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.closerH = 0;
        this.visited = false;
        this.closed = false;
        this.parents.length = 0;
    }

    destroy() {
        this.parents.length = 0;
        this.pathFinder = undefined;
    }

    heuristic(endNode, pathMode, baseNode) {
        if (pathMode === null) {
            return 0;
        }

        var h;
        var dist = this.pathFinder.lxy2dist(endNode.x, endNode.y, this.x, this.y) * this.pathFinder.weightHeuristic;

        if ((pathMode === 1) && (baseNode !== undefined)) {
            var da = endNode.angleTo(baseNode) - this.angleTo(baseNode);
            h = dist + quickAbs(da);
        } else if (pathMode === 2) {
            h = dist + this.pathFinder.Random();
        } else {
            h = dist;
        }

        return h;
    }

    getNeighborNodes() {
        var neighborsLXY = this.pathFinder.getNeighborsLXY(this.x, this.y);
        var _n, _uid;
        var neighborNodes = [];
        for (var i = 0, cnt = neighborsLXY.length; i < cnt; i++) {
            _n = neighborsLXY[i];
            _uid = this.plugin.xyz2uid(_n.x, _n.y, 0);
            if (_uid != null) {
                neighborNodes.push(this.pathFinder.getAStartNode(_uid));
            }
        }

        return neighborNodes;
    };
}

function quickAbs(x) {
    return x < 0 ? -x : x;
};
export default Node;