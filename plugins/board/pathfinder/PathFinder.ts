import ComponentBase from '../../utils/componentbase/ComponentBase';
import GetChessData from '../chess/GetChessData';
import Methods from './Methods';
import CONST from './const';
import IsPlainObject from '../../utils/object/IsPlainObject';
import GetValue from '../../utils/object/GetValue';

const BLOCKER = CONST.BLOCKER;
const INFINITY = CONST.INFINITY;

class PathFinder extends ComponentBase {
    costCallback: any;

    blockerTest: any;
    cacheCost: any;
    chessData: any;
    costCallbackScope: any;
    edgeBlockerTest: any;
    isShutdown: any;
    nodeManager: any;
    occupiedTest: any;
    onParentDestroy: any;
    parent: any;
    pathMode: any;
    setParent: any;
    shuffleNeighbors: any;
    weight: any;

    constructor(gameObject?: any, config?: any) {
        if (IsPlainObject(gameObject)) {
            config = gameObject;
            gameObject = undefined;
        }
        super(gameObject, { eventEmitter: false });

        this.setChess(gameObject);
        this.nodeManager = undefined;
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        var costCallback = GetValue(o, 'costCallback', undefined);
        var costCallbackScope = GetValue(o, 'costCallbackScope', undefined);
        if (costCallback === undefined) {
            costCallback = GetValue(o, 'cost', 1);
        }
        this.setOccupiedTest(GetValue(o, 'occupiedTest', false));
        this.setBlockerTest(GetValue(o, 'blockerTest', false));
        this.setEdgeBlockerTest(GetValue(o, 'edgeBlockerTest', false));
        this.setCostFunction(costCallback, costCallbackScope);
        this.setPathMode(GetValue(o, 'pathMode', 0));
        this.setCacheCostMode(GetValue(o, 'cacheCost', true));
        this.setWeight(GetValue(o, 'weight', 10));
        this.setShuffleNeighborsMode(GetValue(o, 'shuffleNeighbors', false));
        return this;
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        if (this.nodeManager !== undefined) {
            this.nodeManager.destroy();
        }
        this.chessData = undefined;

        super.shutdown(fromScene);
    }

    get gameObject() {
        return this.parent;
    }

    setChess(gameObject?: any) {
        if (gameObject?: any) {
            this.chessData = GetChessData(gameObject);
            if (this.parent !== gameObject) {
                // Remove attatched event from previous gameObject
                if (this.parent && this.parent.once) {
                    this.parent.off('destroy', this.onParentDestroy, this);
                }
                // Attach event
                this.setParent(gameObject);
                if (this.parent && this.parent.once) {
                    this.parent.once('destroy', this.onParentDestroy, this);
                }
            }
        } else {
            this.setParent();
            this.chessData = undefined;
        }
        return this;
    }

    setCostFunction(callback?: any, scope?: any) {
        this.costCallback = callback;
        this.costCallbackScope = scope;
        return this;
    }

    setPathMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = CONST[mode];
        }
        this.pathMode = mode;
        return this;
    }

    setCacheCostMode(value?: any) {
        if (value === undefined) {
            value = true;
        }
        this.cacheCost = value;
        return this;
    }

    setOccupiedTest(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.edgeBlockerTest = enable;
        return this;
    }

    setWeight(value?: any) {
        this.weight = value;
        return this;
    }

    setShuffleNeighborsMode(value?: any) {
        if (value === undefined) {
            value = true;
        }
        this.shuffleNeighbors = value;
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

Object.assign(
    PathFinder.prototype,
    Methods
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