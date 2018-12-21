const GetValue = Phaser.Utils.Objects.GetValue;

var Init = function (dataManager, config) {
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

export default Init;