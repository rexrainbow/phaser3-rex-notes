import EffectMap from './EffectMap.js';

var AddEffectProperties = function (gameObject, config) {
    if (config === undefined) {
        config = true;
    } else if (typeof (config) === 'string') {
        config = { config: true };
    } else if (Array.isArray(config)) {
        var nameList = config;
        var config = {};
        for (var i = 0, cnt = nameList.length; i < cnt; i++) {
            config[nameList[i]] = true;
        }
    }

    if (config === true) {
        // Enable all effect properties
        for (var name in EffectMap) {
            EffectMap[name](gameObject);
        }
    } else {
        for (var name in config) {
            if (config[name] && EffectMap[name]) {
                EffectMap[name](gameObject);
            }
        }
    }

    return gameObject;
}

export default AddEffectProperties;