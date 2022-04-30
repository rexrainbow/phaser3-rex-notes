import { csmMap } from '../../framework/src/type/csmmap';
import { csmVector } from '../../framework/src/type/csmvector';
import { CubismUserModel } from '../../framework/src/model/cubismusermodel';
import ViewMatrix from './ViewMatrix.js';
import GlobalData from '../globaldata/GlobalData.js';
import Methods from './Methods.js';

class Model extends CubismUserModel {
    constructor(parent) {
        super();

        this.parent = parent;  // Live2dGameObject
        this.viewMatrix = new ViewMatrix();

        this._eyeBlinkIds = new csmVector();
        this._lipSyncIds = new csmVector();

        this._motions = new csmMap();

        this._expressions = new csmMap();
        this._currentExpressionName = undefined;

        // this._wavFileHandler = new LAppWavFileHandler();

        // Get shared resources
        this._globalData = GlobalData.getInstance(parent);
    }

    release() {
        super.release();

        this._motions.clear();
        this._expressions.clear();
        this._globalData = undefined;
    }

    get _modelWidth() {
        if (this._model) {
            return this._model._model.canvasinfo.CanvasWidth;
        } else {
            return 0;
        }
    }

    get _modelHeight() {
        if (this._model) {
            return this._model._model.canvasinfo.CanvasHeight;
        } else {
            return 0;
        }
    }

    toLocalX(x) {
        return this._globalData.projectionMatrix.toLocalX(x);
    }

    toLocalY(y) {
        return this._globalData.projectionMatrix.toLocalY(y);
    }
}

Object.assign(
    Model.prototype,
    Methods
)

export default Model;