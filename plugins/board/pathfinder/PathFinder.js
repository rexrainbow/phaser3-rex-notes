import CONST from './const.js';
import AStarSearch from './astartsearch/AStarSearch.js';
import GetCost from './GetCost.js';
import GetArea from './GetArea.js';
import GetPath from './GetPath.js';
import TileXYToCost from './TileXYToCost.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PathFinder {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var costCallback = GetValue(o, 'costCallback', undefined);
        var costCallbackScope = GetValue(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
            costCallback = GetValue(o, 'cost', 1);
        }
        this.setCostFunction(costCallback, costCallbackScope);
        this.setPathMode(GetValue(o, 'pathMode', 0));
        this.setCostCacheMode(GetValue(o, 'costCache', true));
        this.setBlockerTest(GetValue(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue(o, 'edgeBlockerTest', false));        
        this.setWeight(GetValue(o, 'weight', 10));
        this.setShuffleNeighborsMode(GetValue(o, 'shuffleNeighbors', false));
        this.costCache = {}; // { tilexyKey: cost}
        return this;
    }

    shutdown() {
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
    }

    setPathMode(mode) {
        if (typeof (mode) === 'string') {
            mode = CONST[mode];
        }
        this.pathMode = mode;
        return this;
    }

    setCostCacheMode(value) {
        if (value === undefined) {
            value = true;
        }
        this.costCache = value;
        return this;
    }

    setBlockerTest(value) {
        if (value === undefined) {
            value = true;
        }
        this.blockerTest = value;
        return this;
    }

    setEdgeBlockerTest(value) {
        if (value === undefined) {
            value = true;
        }
        this.edgeBlockerTest = value;
        return this;
    }

    setWeight(value) {
        this.weight = value;
        return this;
    }

    setShuffleNeighborsMode(value) {
        if (value === undefined) {
            value = true;
        }
        this.shuffleNeighbors = value;
        return this;
    }
}

var methods = {
    aStarSearch: AStarSearch,
    getCost: GetCost,
    getArea: GetArea,
    getPath: GetPath,
    tileXYToCost: TileXYToCost,
};
Object.assign(
    PathFinder.prototype,
    methods
);

const PATHMODE = {
    'random': 0,
    'diagonal': 1,
    'straight': 2,
    'A*': 3,
    'line': 4,
    'A*-line': 5,
    'A*-random': 6
}

export default PathFinder;