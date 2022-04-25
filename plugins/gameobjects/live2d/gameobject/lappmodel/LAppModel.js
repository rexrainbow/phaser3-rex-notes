import { csmMap } from '../../framework/src/type/csmmap';
import { csmVector } from '../../framework/src/type/csmvector';
import { CubismUserModel } from '../../framework/src/model/cubismusermodel';

import Setup from './Setup.js';
import Update from './Update.js';

class LAppModel extends CubismUserModel {
    constructor() {
        super();

        this._eyeBlinkIds = new csmVector();
        this._lipSyncIds = new csmVector();

        this._motions = new csmMap();
        this._expressions = new csmMap();

        // this._wavFileHandler = new LAppWavFileHandler();
    }

    setup(data) {
        Setup(this, data);
        return this;
    }
}

var Methods = {
    update: Update,
}

Object.assign(
    LAppModel.prototype,
    Methods
)

export default LAppModel;