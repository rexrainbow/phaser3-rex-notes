import GetChessData from '../chess/GetChessData.js';
import FindFOV from './FindFOV.js';
import IsInLOS from './IsInLOS.js';
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
        this.faceAngle = this.board.angleToward(this.chessData.tileXYZ, this.face);
        return this;
    }

    setCone(degrees) {
        this.halfCone = DegToRad(degrees/2);
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
    getCost: GetCost,
};
Object.assign(
    FieldOfView.prototype,
    methods
);

export default FieldOfView;