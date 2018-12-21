import BuffMethods from './Buff';

const GetValue = Phaser.Utils.Objects.GetValue;

var Extend = function (dataManager, config) {
    if (dataManager.buffs === undefined) {
        dataManager.buffs = {};
        dataManager.bounds = {};
    }
    if (dataManager.addBuff === undefined) {
        Object.assign(dataManager, BuffMethods);
    }
    
    var buffs = GetValue(config, 'buff', undefined);
    if (buffs) {
        for (var key in buffs) {
            for (var buffKey in buffs) {
                dataManager.addBuff(key, buffKey, buffs[buffKey]);
            }
        }
    }
    var bounds = GetValue(config, 'bounds', undefined);
    if (bounds) {
        var b;
        for (var key in bounds) {
            b = bounds[key];
            dataManager.setBounds(key, b.min, b.max);
        }
    }
    return dataManager;
}

export default Extend