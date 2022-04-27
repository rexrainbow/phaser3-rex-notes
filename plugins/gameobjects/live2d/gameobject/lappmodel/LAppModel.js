import { csmMap } from '../../framework/src/type/csmmap';
import { csmVector } from '../../framework/src/type/csmvector';
import { CubismUserModel } from '../../framework/src/model/cubismusermodel';
import GlobalData from './GlobalData';

import Setup from './Setup.js';
import Update from './Update.js';
import Draw from './Draw.js';

class LAppModel extends CubismUserModel {
    constructor(parent) {
        super();

        this.parent = parent;  // Live2dGameObject

        this._eyeBlinkIds = new csmVector();
        this._lipSyncIds = new csmVector();

        this._motions = new csmMap();
        this._expressions = new csmMap();

        // this._wavFileHandler = new LAppWavFileHandler();

        // Get shared resources
        var data = GlobalData.getInstance(parent);
        this._gl = data.gl;
        this._frameBuffer = data.frameBuffer;
        this._viewportRect = data.viewportRect;
        this._projectionMatrix = data.projectionMatrix;
    }

    release() {
        super.release();

        this._gl = undefined;
        this._frameBuffer = undefined;
        this._viewportRect = undefined;
        this._projectionMatrix = undefined;
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
}

var Methods = {
    setup: Setup,
    update: Update,
    draw: Draw,
}

Object.assign(
    LAppModel.prototype,
    Methods
)

export default LAppModel;