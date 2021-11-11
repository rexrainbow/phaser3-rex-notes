var FireSetValueEvents = function (eventEmitter, prefix, property, value, prevValue) {
    var propPath = (prefix === '') ? property : `${prefix}.${property}`;
    eventEmitter.emit(`set-${propPath}`, value, prevValue);

    var propStarPath = (prefix === '') ? '*' : `${prefix}.*`
    eventEmitter.emit(`set-${propStarPath}`, property, value, prevValue);

    eventEmitter.emit(`set`, propPath, value, prevValue);
}

export default FireSetValueEvents;