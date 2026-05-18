import methods from './Methods';

var Extend = function(dataManager?: any) {
    if (dataManager.buffs === undefined) {
        dataManager.baseValues = {};
        dataManager.buffs = {};
        dataManager.bounds = {};
    }
    if (dataManager.addBuff === undefined) {
        Object.assign(dataManager, methods);
    }
    return dataManager;
}

export default Extend