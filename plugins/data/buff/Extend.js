import BuffMethods from './Buff';
import Init from './Init';

var ExtendExisting = function (dataManager, config) {
    dataManager.buffs = {};
    dataManager.bounds = {};
    Object.assign(dataManager, BuffMethods);
    Init(dataManager, config);
    return dataManager;
}

export default ExtendExisting