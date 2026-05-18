import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var SetProperties = function(properties?: any, config?: any, out?: any) {
    if (out === undefined) {
        out = {};
    }

    var property, value;
    for (var key in properties) {
        property = properties[key];  // [propName, defaultValue]
        value = GetValue(config, key, property[1]);
        if (value !== undefined) {
            out[property[0]] = value;
        }
    }

    return out;
}

export default SetProperties;