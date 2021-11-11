var FireAddKeyEvents = function (eventEmitter, prefix, property, value) {
    var propPath = (prefix === '') ? property : `${prefix}.${property}`;
    eventEmitter.emit(`add-${propPath}`, value);

    var propStarPath = (prefix === '') ? '*' : `${prefix}.*`
    eventEmitter.emit(`add-${propStarPath}`, property, value);

    eventEmitter.emit(`add`, propPath, value);
}

export default FireAddKeyEvents;