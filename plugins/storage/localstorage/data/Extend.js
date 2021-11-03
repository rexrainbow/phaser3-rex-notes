import StorageMethods from './StorageMethods.js';
import Load from './Load.js';
import AddCallbacks from './AddCallbacks.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const SetStruct = Phaser.Structs.Set;


var methods = {
    load: Load,
}

var Extend = function (dataManager, config) {
    if (dataManager.hasOwnProperty('_syncEnable')) {
        // Already extended
        return dataManager;
    }

    dataManager._syncEnable = true;
    dataManager.dataKeys = new SetStruct();

    Object.assign(
        dataManager,
        StorageMethods,
        methods
    );

    AddCallbacks(dataManager);

    dataManager.name = GetValue(config, 'name', '');
    dataManager.load(GetValue(config, 'init', undefined), GetValue(config, 'reset', false));

    return dataManager;
}

export default Extend