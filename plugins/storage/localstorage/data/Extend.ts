import StorageMethods from './StorageMethods';
import Load from './Load';
import GetDefaultValue from './GetDefaultValue';
import AddCallbacks from './AddCallbacks';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var methods = {
    load: Load,
    getDefaultValue: GetDefaultValue,
}

var Extend = function(dataManager?: any, config?: any) {
    if (dataManager.hasOwnProperty('_syncEnable')) {
        // Already extended
        return dataManager;
    }

    dataManager._syncEnable = true;
    dataManager.dataKeys = new Set();
    dataManager.defaultData = undefined;

    Object.assign(
        dataManager,
        StorageMethods,
        methods
    );

    AddCallbacks(dataManager);

    dataManager.name = GetValue(config, 'name', '');

    var load = GetValue(config, 'load', true);
    if (load?: any) {
        var defaultData = GetValue(config, 'default', undefined);
        var resetFlag = GetValue(config, 'reset', false);
        dataManager.load(defaultData, resetFlag);
    }

    return dataManager;
}

export default Extend