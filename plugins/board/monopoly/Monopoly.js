import Methods from './Methods.js';
import GetChessData from '../chess/GetChessData.js';
import CONST from './const.js';
import GetValue from '../../utils/object/GetValue.js';

const BLOCKER = CONST.BLOCKER;
const STOP = CONST.STOP;

class Monopoly {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.chessData = GetChessData(gameObject);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.preTileXY = GetValue(o, 'preTileXY', undefined);
        var costCallback = GetValue(o, 'costCallback', undefined);
        var costCallbackScope = GetValue(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
            costCallback = GetValue(o, 'cost', 1);
        }
        this.setFace(GetValue(o, 'face', 0));
        this.setPathMode(GetValue(o, 'pathMode', 0));
        this.setPathTileZ(GetValue(o, 'pathTileZ', 0));
        this.setCostFunction(costCallback, costCallbackScope);
        return this;
    }

    boot() {
        if (this.gameObject.once) { // oops, bob object does not have event emitter
            this.gameObject.once('destroy', this.destroy, this);
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

    setFace(direction) {
        direction = this.board.grid.directionNormalize(direction);
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

    setPathTileZ(value) {
        if (value === undefined) {
            value = true;
        }
        this.pathTileZ = value;
        return this;
    }

    get BLOCKER() {
        return BLOCKER;
    }

    get STOP() {
        return STOP;
    }

    get board() {
        return this.chessData.board;
    }
}

Object.assign(
    Monopoly.prototype,
    Methods
);

const PATHMODE = {
    'forward': 0,
    'random': 1
}
export default Monopoly;