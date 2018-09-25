import GetChessData from '../chess/GetChessData.js';
import GetPath from './GetPath.js';
import GetNextTile from './GetNextTile.js';
import GetCost from './GetCost.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Monopoly {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.chessData = GetChessData(gameObject);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var costCallback = GetValue(o, 'costCallback', undefined);
        var costCallbackScope = GetValue(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
            costCallback = GetValue(o, 'cost', 1);
        }
        this.setFaceDirection(GetValue(o, 'face', 0));
        this.setPathMode(GetValue(o, 'pathMode', 0));
        this.setBlockerTest(GetValue(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue(o, 'edgeBlockerTest', false));
        this.setCostFunction(costCallback, costCallbackScope);
        return this;
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.gameObject = undefined;
        this.chessData = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setFaceDirection(direction) {
        this.face = direction;
        return this;
    }

    setPathMode(mode) {
        if (typeof (mode) === 'string') {
            mode = PATHMODE[mode];
        }
        this.pathMode = mode;
        return this;
    }

    setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
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

    get board() {
        return this.chessData.board;
    }
}

var methods = {
    getPath: GetPath,
    getNextTile: GetNextTile,
    getCost: GetCost,
};
Object.assign(
    Monopoly.prototype,
    methods
);

const PATHMODE = {
    'forward': 0,
    'random': 1
}
export default Monopoly;