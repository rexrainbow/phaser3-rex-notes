var SerializeValue = function (value) {
    if (value == null) {
        return value;
    }

    var valueType = typeof (value);
    if ((valueType === 'string') || (valueType === 'number') || (valueType === 'boolean')) {
        return value;
    }

    if (valueType === 'function') {
        return `[function ${value.name || 'anonymous'}]`;
    }

    try {
        return JSON.parse(JSON.stringify(value));
    } catch (e) {
        var constructorName = value.constructor && value.constructor.name;
        return `[${constructorName || valueType}]`;
    }
}

export default SerializeValue;