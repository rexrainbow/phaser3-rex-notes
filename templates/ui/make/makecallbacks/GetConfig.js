import DeepClone from '../../../../plugins/utils/object/DeepClone.js';

var GetConfig = function (config, styles) {
    if (styles === undefined) {
        return config;
    }

    if (config.hasOwnProperty('name')) {
        Merge(config, styles[`#${config.name}`]);
    }

    if (config.hasOwnProperty('class')) {
        var clasKeys = config.class.split(' ');
        for (var i = 0, cnt = clasKeys.length; i < cnt; i++) {
            Merge(config, styles[`.${clasKeys[i]}`]);
        }
    }

    if (config.hasOwnProperty('type')) {
        Merge(config, styles[config.type]);
    }

    return config;
}

var Merge = function (toObj, fromObj) {
    if (fromObj === undefined) {
        return toObj;
    }

    fromObj = DeepClone(fromObj);
    for (var key in fromObj) {
        if (!toObj.hasOwnProperty(key)) {
            toObj[key] = fromObj[key];
        }
    }
    return toObj;
}

export default GetConfig;