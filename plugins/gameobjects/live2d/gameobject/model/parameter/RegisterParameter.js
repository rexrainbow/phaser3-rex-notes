import { CubismFramework } from '../../../framework/src/live2dcubismframework';
import { CubismDefaultParameterId } from '../../../framework/src/cubismdefaultparameterid';

import { Utils as PhaserUtils } from 'phaser';
const Capitalize = PhaserUtils.String.UppercaseFirst;

var RegisterParameter = function (name) {
    var capName = `Param${Capitalize(name)}`;
    var propertyName = `_id${capName}`;
    if (this.hasOwnProperty(propertyName)) {
        return this;
    }
    if (!CubismDefaultParameterId.hasOwnProperty(capName)) {
        // Error;
        return this;
    }

    var parameterId = CubismDefaultParameterId[capName];
    this[propertyName] = CubismFramework.getIdManager().getId(parameterId);

    this._addParamValues[name] = 0;

    return this;
}

export default RegisterParameter;