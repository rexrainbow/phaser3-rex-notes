import {
    StringType, NumberType, RangeType, ListType,
    BooleanType,
} from './InputTypes.js';


var GetInputType = function (value, config) {
    // Force input type to view
    if (config.view) {
        return config.view;
    }

    if (config.options) {
        return ListType;
    }

    switch (typeof (value)) {
        case 'number':
            if (HasProperties(config, 'min', 'max')) {
                return RangeType;
            }

            return NumberType;

        case 'string':
            return StringType;

        case 'boolean':
            return BooleanType;

        default:
            return StringType;
    }

}

var HasProperties = function (object, ...keys) {
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        if (object[keys[i]] === undefined) {
            return false;
        }
    }
    return true;
}

export default GetInputType;