import GetChessData from '../chess/GetChessData.js';
import FindFOV from './FindFOV.js';
import IsInLOS from './IsInLOS.js';
import LOS from './LOS.js';
import GetCost from './GetCost.js';
import CONST from './const.js';
import DegToRad from '../../utils/math/DegToRad.js';
import GetValue from '../../utils/object/GetValue.js';

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

class FieldOfView {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.chessData = GetChessData(gameObject);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var costCallback = GetValue(o, 'costCallback', undefined);
        var costCallbackScope = GetValue(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
            costCallback = GetValue(o, 'cost', 0);
        }
        this.setFaceDirection(GetValue(o, 'face', 0));
        this.setCone(GetValue(o, 'cone', 360));
        this.setOccupiedTest(GetValue(o, 'occupiedTest', false));
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

    get face() {
        return this._face;
    }

    set face(direction) {
        this._face = direction;
        this.faceAngle = this.board.angleToward(this.chessData.tileXYZ, direction);
    }

    setFaceDirection(direction) {
        this.face = direction;
        return this;
    }

    get cone() {
        return this._cone;
    }

    set cone(degrees) {
        this._cone = degrees;
        this.halfConeRad = DegToRad(degrees / 2);
    }

    setCone(degrees) {
        this.cone = degrees;
        return this;
    }

    setOccupiedTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
    }

    setCostFunction(callback, scope) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
    }

    get BLOCKER() {
        return BLOCKER;
    }

    get INFINITY() {
        return INFINITY;
    }

    get board() {
        return this.chessData.board;
    }
}

var methods = {
    findFOV: FindFOV,
    isInLOS: IsInLOS,
    LOS: LOS,
    getCost: GetCost,
};
Object.assign(
    FieldOfView.prototype,
    methods
);

export default FieldOfView;