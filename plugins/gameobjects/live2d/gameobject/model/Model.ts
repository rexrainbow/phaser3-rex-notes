import { csmMap } from '../../framework/src/type/csmmap';
import { csmVector } from '../../framework/src/type/csmvector';
import { CubismUserModel } from '../../framework/src/model/cubismusermodel';
import ViewMatrix from './ViewMatrix';
import GlobalData from '../globaldata/GlobalData';
import Methods from './Methods';

class Model extends CubismUserModel {
    _addParamValues: any;
    _currentExpressionName: any;
    _expressions: any;
    _eyeBlinkIds: any;
    _globalData: any;
    _hitTestResult: any;
    _lipSyncIds: any;
    _lipSyncValue: any;
    _motions: any;
    _pixelHeight: any;
    _pixelWidth: any;
    _prevHitTestResult: any;
    _wavFileHandler: any;
    parent: any;
    viewMatrix: any;

    constructor(parent?: any) {
        super();

        // Initialize Live2d framework, and get shared resources
        this._globalData = GlobalData.getInstance(parent);

        this.parent = parent;  // Live2dGameObject
        this.viewMatrix = new ViewMatrix();

        this._eyeBlinkIds = new csmVector();

        this._lipSyncIds = new csmVector();
        this._lipSyncValue = 0;

        this._motions = new csmMap();

        this._expressions = new csmMap();
        this._currentExpressionName = undefined;

        this._addParamValues = {};

        this._pixelWidth = 0;
        this._pixelHeight = 0;

        this._hitTestResult = {};
        this._prevHitTestResult = {};

        // this._wavFileHandler = new LAppWavFileHandler();
    }

    release() {
        super.release();

        this.parent = undefined;
        this._globalData = undefined;
    }
}

Object.assign(
    Model.prototype,
    Methods
)

export default Model;