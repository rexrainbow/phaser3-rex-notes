import ComponentBase from '../../utils/componentbase/ComponentBase';
import Methods from './Methods';
import GetChessData from '../chess/GetChessData';
import CONST from './const';
import GetValue from '../../utils/object/GetValue';

const BLOCKER = CONST.BLOCKER;
const STOP = CONST.STOP;

class Monopoly extends ComponentBase {
    costCallback: any;

    chessData: any;
    costCallbackScope: any;
    face: any;
    isShutdown: any;
    parent: any;
    pathMode: any;
    pathTileZ: any;
    preTileXY: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.chessData = GetChessData(gameObject);
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
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

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.chessData = undefined;

        super.shutdown(fromScene);
    }

    setFace(direction?: any) {
        direction = this.board.grid.directionNormalize(direction);
        this.face = direction;
        return this;
    }

    setPathMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = PATHMODE[mode];
        }
        this.pathMode = mode;
        return this;
    }

    setCostFunction(callback?: any, scope?: any) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
    }

    setPathTileZ(value?: any) {
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